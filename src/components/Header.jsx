import React from 'react';
import './Header.css'; // Import your CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <img src="/assets/album.png" alt="Profile" className="header__photo" />
        <h1 className="header__name">PhotoFolio</h1>
      </div>
    </header>
  );
};

export default Header;
