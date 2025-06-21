import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import Navbar from '../Navbar';
import FooterComponent from '../FooterComponent';
import './Architecture.css';

const namesList = [
  'Alice', 'Andrew', 'Barbara', 'Ben', 'Catherine', 'Charles',
  'Diana', 'Daniel', 'Elaine', 'Edward', 'Fiona', 'Frank',
  'George', 'Grace', 'Hannah', 'Henry', 'Isabella', 'Ian',
  'Jack', 'Julia', 'Kevin', 'Kara', 'Laura'
];

const splitNamesIntoColumns = (list, columns = 3) => {
  const perColumn = Math.ceil(list.length / columns);
  return Array.from({ length: columns }, (_, i) =>
    list.slice(i * perColumn, i * perColumn + perColumn)
  );
};

const Food = () => {
  const [selectedName, setSelectedName] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [foodData, setFoodData] = useState({});

  const navigate = useNavigate(); // 👈 Initialize navigate

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('data/Food_data.json')
      .then(response => response.json())
      .then(data => setFoodData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredNames = namesList
    .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const columns = splitNamesIntoColumns(filteredNames);

  const closeHoverBox = () => setSelectedName(null);

  // Map suggested names to routes
  const suggestedRoutes = {
    Architecture: '/architecture',
    Ayurvedic: '/ayurvedics',
    Crafts: '/crafts',
    Dance: '/dance',
    Festival: '/festivals',
    Music: '/music',
    Palaces: '/palaces',
    Religions: '/religions',
  };

  return (
    <div className="architecture-container">
      <Navbar />

      <div className="architecture-header">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button> {/* 👈 Go back */}
        <h1 className="page-heading">Food</h1>
        <div className="search-container">
          <div className="profile-img" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="name-grid">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="space-y-3">
            {col.map((name, index) => (
              <div
                key={index}
                className="name-card"
                onClick={() => setSelectedName(name)}
              >
                {name}
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedName && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={closeHoverBox}>&times;</button>

            <div className="modal-image-wrapper">
  <img
    src={`images/${selectedName}.png`} // 👈 Adjust the path to your image directory
    alt={selectedName}
    className="modal-image"
  />
  <div className="modal-blur-overlay" />
</div>


            <div className="modal-content">
              <h2>{selectedName}</h2>
              <p>
                {foodData[selectedName] || "No details available for this person."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Suggested Names Row */}
      <div className="suggested-section">
        <h2 className="suggested-title">Suggested</h2>
        <div className="suggested-names-row">
          {Object.keys(suggestedRoutes).map(name => (
            <div
              key={name}
              className="suggested-name-card"
              onClick={() => navigate(suggestedRoutes[name])} // 👈 Navigate to corresponding route
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <FooterComponent />
    </div>
  );
};

export default Food;
