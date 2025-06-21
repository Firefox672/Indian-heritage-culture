import React from 'react';
import './Navbar.css';

const NavbarComponent = () => {
  const titleWords = ['TITLE', 'OF', 'THE', 'WEBPAGE'];
  const navItems = ['Home', 'About-Us', 'Explore', 'Contact-Us'];

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top custom-navbar">
      <div className="title-container">
        {titleWords.map((word, index) => (
          <span key={index} className="title-word">
            {word}
          </span>
        ))}
      </div>

      <ul className="nav-items">
        {navItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarComponent;
