import React from "react";
import "./AlbumList.css"; // Import CSS file for styling (create if not exists)

const AlbumList = ({ albums, setShowAlbumImages }) => {
  return (
    <div className="album-list">
      {albums.map((album, index) => (
        <div
          className="album-card"
          key={index}
          onClick={() => {
            setShowAlbumImages({
              isOpened: true,
              selectedAlbum: album,
            });
          }}
        >
          <div className="album-image">
            <img src="/assets/book.png" alt="album" />
          </div>
          <div className="album-details">
            <p className="album-name">{album?.name}</p>
            <p className="created-at">
              Created: {formatDate(album?.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Function to format date as per requirement
const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export default AlbumList;
