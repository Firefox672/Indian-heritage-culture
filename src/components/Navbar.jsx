import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const titleWords = ['INDIA', 'HERITAGE', '&', 'CULTURE'];
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }

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
        <li onClick={() => handleNavigation('/')}>Home</li>
        <li onClick={() => handleNavigation('/aboutus')}>About Us</li>
        <li onClick={() => handleNavigation('/explore')}>Explore</li>
        <li onClick={() => handleNavigation('/contactus')}>Contact Us</li>
      </ul>
    </div>
  );
};

export default NavbarComponent;
