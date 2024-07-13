import React from "react";
import "./ImageGallery.css";

const ImageGallery = ({
  images,
  setImage,
  setAddImage,
  setIsEditImage,
  deleteImageHandeler,
}) => {
  return (
    <div className="gallery-container">
      {images?.map((image, index) => (
        <div className="gallery-item" key={index}>
          <img src={image?.url} alt={image.name} className="gallery-img" />
          <div className="gallery-overlay">
            <div className="gallery-text">{image?.name}</div>
            <div className="gallery-buttons">
              <button
                className="gallery-btn edit"
                onClick={() => {
                  setAddImage(true);
                  setImage({
                    name: image?.name,
                    url: image?.url,
                    id: image?.id,
                  });
                  setIsEditImage(true);
                }}
              >
                <img src="/assets/pen.png" alt="edit" className="icon" />
              </button>
              <button
                className="gallery-btn delete"
                onClick={() => {
                  deleteImageHandeler(image);
                }}
              >
                <img src="/assets/bin.png" alt="delete" className="icon" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {!images?.length && (
        <div>
          <h2>No Images Added In The Album</h2>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
