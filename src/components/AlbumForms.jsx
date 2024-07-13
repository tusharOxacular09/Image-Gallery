import React, { useState } from "react";
import "./CreateAlbumForm.css";

const CreateAlbumForm = ({ addAlbum }) => {
  const [album, setAlbum] = useState("");

  const handleCreateAlbum = () => {
    if (!album) {
      return;
    }
    addAlbum({ name: album, createdAt: new Date().toISOString() });
    handleClearForm();
  };

  const handleClearForm = () => {
    setAlbum("");
  };

  return (
    <div className="create-album-form">
      <input
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        type="text"
        placeholder="Enter Album Name..."
        className="album-input"
        onKeyDown={(event) => {
          if (event.code === "Enter" && album) {
            handleCreateAlbum();
          }
        }}
      />
      <div className="button-container">
        <button
          onClick={handleClearForm}
          disabled={!album}
          className={`clear-button ${!album && "dissabled-button"}`}
        >
          Clear
        </button>
        <button
          onClick={handleCreateAlbum}
          disabled={!album}
          className={`create-button ${!album && "dissabled-button"}`}
        >
          Create
        </button>
      </div>
    </div>
  );
};

const AddImageForm = ({
  addImageHandeler,
  image,
  setImage,
  isEditImage,
  editImageHandeler,
}) => {
  const handleAddImage = () => {
    if (!image.name || !image.url) {
      return;
    }

    if (!isEditImage) {
      // Add Image
      addImageHandeler(image);
    } else {
      // Edit Image Logic
      editImageHandeler(image);
    }
    // Clearing The Form
    handleClearForm();
  };

  const handleClearForm = () => {
    setImage({
      name: "",
      url: "",
    });
  };

  return (
    <div className="create-album-form">
      <input
        value={image.name}
        onChange={(e) =>
          setImage((prev) => {
            return { ...prev, name: e.target.value };
          })
        }
        type="text"
        placeholder="Enter Image Name..."
        className="album-input"
      />
      <input
        value={image.url}
        onChange={(e) =>
          setImage((prev) => {
            return { ...prev, url: e.target.value };
          })
        }
        type="text"
        placeholder="Enter Image Url..."
        className="album-input"
      />
      <div className="button-container">
        <button
          onClick={handleClearForm}
          disabled={!image.name || !image.url}
          className={`clear-button ${
            (!image.name || !image.url) && "dissabled-button"
          }`}
        >
          Clear
        </button>
        <button
          onClick={handleAddImage}
          disabled={!image.name || !image.url}
          className={`create-button ${
            (!image.name || !image.url) && "dissabled-button"
          }`}
        >
          {isEditImage ? "Edit" : "Create"}
        </button>
      </div>
    </div>
  );
};

export { CreateAlbumForm, AddImageForm };
