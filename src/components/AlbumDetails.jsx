import React, { useState } from "react";
import "./AlbumDetails.css";
import { AddImageForm } from "./AlbumForms";
import ImageGallery from "./ImageGallery";

const AlbumDetails = ({
  showAlbumImages,
  setShowAlbumImages,
  addImageToAlbum,
  editImage,
  deleteImage
}) => {
  const [addImage, setAddImage] = useState(false);
  const [image, setImage] = useState({
    name: "",
    url: "",
  });
  const [isEditImage, setIsEditImage] = useState(false);

  const addImageHandeler = async (image) => {
    addImageToAlbum(showAlbumImages?.selectedAlbum?.id, {
      ...image,
      id: Date.now(),
    });
  };

  const editImageHandeler = (image) => {
    editImage(showAlbumImages?.selectedAlbum?.id, image);
  };

  const deleteImageHandeler = (image) => {
    deleteImage(showAlbumImages?.selectedAlbum?.id, image)
  }

  return (
    <div className="album-details">
      <div className="sub-header custom-margin-top">
        <div className="heading-container">
          <img
            onClick={() => {
              setShowAlbumImages({
                isOpened: false,
                selectedAlbum: {},
              });
            }}
            className="back-arrow-btn"
            src="/assets/back.png"
            alt="back-arrow"
          />
          <h2>{showAlbumImages?.selectedAlbum?.name}</h2>
        </div>
        <button
          onClick={() => {
            setAddImage(!addImage);
            setIsEditImage(false);
            setImage({
              name: "",
              url: "",
            });
          }}
          className={addImage ? "cancel-btn" : "add-album-btn"}
        >
          {addImage ? "Cancel" : "Add Image"}
        </button>
      </div>

      {addImage && (
        <AddImageForm
          addImageHandeler={addImageHandeler}
          image={image}
          setImage={setImage}
          isEditImage={isEditImage}
          setIsEditImage={setIsEditImage}
          editImageHandeler={editImageHandeler}
        />
      )}

      <ImageGallery
        images={showAlbumImages?.selectedAlbum?.images || []}
        image={image}
        setImage={setImage}
        setAddImage={setAddImage}
        setIsEditImage={setIsEditImage}
        deleteImageHandeler={deleteImageHandeler}
      />
    </div>
  );
};

export default AlbumDetails;
