export const albumReducer = (state, action) => {
  const { album, allAlbums, id, image } = action.payload;
  switch (action.type) {
    case "ADD_ALBUM": {
      return {
        albums: [album, ...state.albums],
      };
    }
    case "GET_ALL_ALBUMS": {
      return {
        albums: allAlbums,
      };
    }
    case "ADD_IMAGE": {
      const albumIndex = state.albums.findIndex((album) => album.id === id);
      if (albumIndex === -1) {
        return state;
      }

      const album = state.albums[albumIndex];
      const updatedImages = [image, ...(album.images || [])];

      const updatedAlbum = {
        ...album,
        images: updatedImages,
      };

      const updatedAlbums = [
        ...state.albums.slice(0, albumIndex),
        updatedAlbum,
        ...state.albums.slice(albumIndex + 1),
      ];

      return {
        ...state,
        albums: updatedAlbums,
      };
    }

    case "EDIT_IMAGE": {
      const albumIndex = state.albums.findIndex((album) => album.id === id);
      if (albumIndex === -1) {
        return state;
      }

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

      const updatedAlbums = [
        ...state.albums.slice(0, albumIndex),
        updatedAlbum,
        ...state.albums.slice(albumIndex + 1),
      ];

      return {
        ...state,
        albums: updatedAlbums,
      };
    }

    case "DELETE_IMAGE": {
      const albumIndex = state.albums.findIndex((album) => album.id === id);
      if (albumIndex === -1) return state;

      const album = state.albums[albumIndex];
      const imageIndex = album?.images?.findIndex((img) => img.id === image.id);
      if (imageIndex === -1) return state;
      const updatedImages = album?.images?.splice(imageIndex, 1);

      const updatedAlbum = {
        ...album,
        images: updatedImages,
      };

      const updatedAlbums = [
        ...state.albums.slice(0, albumIndex),
        updatedAlbum,
        ...state.albums.slice(albumIndex + 1),
      ];

      return {
        ...state,
        albums: updatedAlbums,
      };
    }

    default: {
      return state;
    }
  }
};
