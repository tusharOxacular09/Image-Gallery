import { CreateAlbumForm } from "./components/AlbumForms";
import Header from "./components/Header";
import { useEffect, useReducer, useState } from "react";
import { albumReducer } from "./albumReducer";
import AlbumList from "./components/AlbumList";
import toast, { Toaster } from "react-hot-toast";
import { db } from "./firebase.init";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import AlbumDetails from "./components/AlbumDetails";
const COLLECTION_NAME = "albums";

function App() {
  const [state, dispatch] = useReducer(albumReducer, { albums: [] });
  const [openCreateAlbumForm, setOpenCreateAlbumForm] = useState(false);
  const [showAlbumImages, setShowAlbumImages] = useState({
    isOpened: false,
    selectedAlbum: {},
  });

  const addAlbum = async (album) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), album);
      dispatch({
        type: "ADD_ALBUM",
        payload: { album: { ...album, id: docRef.id } },
      });
      toast.success("Successfully Created New Album!", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error While Creating Album!", {
        duration: 3000,
      });
    }
  };

  const getAllAlbums = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const allAlbums = querySnapshot?.docs?.map((document) => {
        return { id: document.id, ...document.data() };
      });
      dispatch({ type: "GET_ALL_ALBUMS", payload: { allAlbums } });
      toast.success("Successfully Getting All Albums!", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error While Getting Albums!", {
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getAllAlbums();
  }, []);

  const addImageToAlbum = async (id, image) => {
    try {
      if (!id || !image) {
        return;
      }

      const albumIndex = state.albums.findIndex((album) => album.id === id);
      if (albumIndex === -1) {
        return;
      }

      const album = state.albums[albumIndex];
      const updatedImages = [image, ...(album.images || [])];

      const albumDocRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(albumDocRef, {
        images: updatedImages,
      });

      dispatch({ type: "ADD_IMAGE", payload: { id, image } });

      // Updating State After Image Adding
      setShowAlbumImages((prev) => {
        return {
          ...prev,
          selectedAlbum: {
            ...(prev.selectedAlbum || {}),
            images: updatedImages,
          },
        };
      });

      toast.success("Successfully Added New Image!", {
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editImage = async (id, image) => {
    try {
      if (!id || !image) {
        return;
      }

      // State Logic To Re update the selected album after updation
      const albumIndex = state.albums.findIndex((album) => album.id === id);
      if (albumIndex === -1) return;
      const album = state.albums[albumIndex];
      const imageIndex = album?.images?.findIndex((img) => img.id === image.id);
      const updatedImages = [
        ...album.images.slice(0, imageIndex),
        image,
        ...album.images.slice(imageIndex + 1),
      ];
      const updatedAlbum = {
        ...album,
        images: updatedImages,
      };

      // Logice update the image in the firestore
      const albumDocRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(albumDocRef, {
        images: updatedImages,
      });

      // Dispatch the reducer
      dispatch({ type: "EDIT_IMAGE", payload: { id, image } });
      // Updating State After Image Adding
      setShowAlbumImages((prev) => {
        return {
          ...prev,
          selectedAlbum: updatedAlbum,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = async (id, image) => {
    try {
      if (!id || !image) {
        return;
      }

      // State Logic To Re update the selected album after updation
      const albumIndex = state.albums.findIndex((album) => album.id === id);
      if (albumIndex === -1) return;
      const album = state.albums[albumIndex];
      const imageIndex = album?.images?.findIndex((img) => img.id === image.id);
      if (imageIndex === -1) return;
      album?.images?.splice(imageIndex, 1);
      console.log("1:::", album?.images);
      const updatedAlbum = {
        ...album,
        images: album?.images,
      };

      // Logice update the image in the firestore
      const albumDocRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(albumDocRef, {
        images: album?.images,
      });

      // Dispatch the reducer
      dispatch({ type: "DELETE_IMAGE", payload: { id, image } });
      // Updating State After Image Adding
      setShowAlbumImages((prev) => {
        return {
          ...prev,
          selectedAlbum: updatedAlbum,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        {showAlbumImages.isOpened ? (
          <AlbumDetails
            showAlbumImages={showAlbumImages}
            setShowAlbumImages={setShowAlbumImages}
            addImageToAlbum={addImageToAlbum}
            editImage={editImage}
            deleteImage={deleteImage}
          />
        ) : (
          <>
            {openCreateAlbumForm && <CreateAlbumForm addAlbum={addAlbum} />}
            <div className="sub-header">
              <h2>Your Albums</h2>
              <button
                onClick={() => setOpenCreateAlbumForm(!openCreateAlbumForm)}
                className={openCreateAlbumForm ? "cancel-btn" : "add-album-btn"}
              >
                {openCreateAlbumForm ? "Cancel" : "Add Album"}
              </button>
            </div>
            <AlbumList
              albums={state.albums}
              setShowAlbumImages={setShowAlbumImages}
            />
          </>
        )}
      </div>

      {/* Toaster Configuration */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
