import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import Navbar from '../Navbar';
import FooterComponent from '../FooterComponent';
import './Architecture.css';

const groupedNames = {
  "Medicinal Plants (Dravya-Guna) — Classical + Modern":[
    "Plants listed in Charaka Saṃhitā",
    "Plants added in Sushruta Saṃhitā",
    "Plants in Aṣṭāṅga Hṛdaya",
    "Bhāvaprakāśa Nighaṇṭu additions",
    "Regional or tribal additions",
    "Modern pharmacopoeial list"
  ],
  "Classical Formulations":[
    "Mahā Khaṇḍas",
    "Rasāyanas, Rejuvenatives & Tonics",
    "Churnas (Powders)",
    "Ghṛtas (Clarified Butter Preparations)",
    "Avalehas (Confections or Dravyas mixed with honey or jaggery)",
    "Aṣṭamāṅga formulations",
    "Sutras & Tailas",
    "Lauhas, Vajraka, Herbo-mineral Shilas",
    "Prakṛti-Taila or Varti"
  ],
  "Modern Proprietary (AYUSH-Registered) Products":[
    "Single-herb tablets or capsules",
    "Polyherbal combinations",
    "Syrups & Arishtas",
    "Oils & Ointments",
    "Medicated Ghṛtas & Avalehas",
    "Proprietary spa or skincare blends",
    "Nutraceuticals",
  ]
};

const Ayurvedics = () => {
  const [selectedName, setSelectedName] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [ayurvedicsData, setAyurvedicsData] = useState({});

  const navigate = useNavigate(); // 👈 Initialize navigate

  useEffect(() => {
      window.scrollTo(0, 0);
      
      fetch('data/Ayurvedics_data.json')
        .then(response => response.json())
        .then(data => setAyurvedicsData(data))
        .catch(error => console.error('Error fetching data:', error));
  
      const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeHoverBox();
      }
    };
  
    const handleClickOutside = (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        closeHoverBox();
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);
  
    const closeHoverBox = () => setSelectedName(null);

  // Map suggested names to routes
  const suggestedRoutes = {
    Architecture: '/architecture',
    Crafts: '/crafts',
    Dance: '/dance',
    Festival: '/festivals',
    Food: '/food',
    Music: '/music',
    Palaces: '/palaces',
    Religions: '/religions',
  };

  return (
    <div className="architecture-container">
      <Navbar />

      <div className="architecture-header">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button> {/* 👈 Go back */}
        <h1 className="page-heading">Ayurvedics</h1>
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

      {Object.entries(groupedNames).map(([heading, names]) => {
        const filtered = names.filter(name =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filtered.length === 0) return null;

        return (
          <div key={heading} className="group-section">
            <h2 className="group-heading">{heading}</h2>
            <hr className="group-separator" />
            <div className="name-grid">
              {filtered.map((name, index) => (
                <div
                  key={index}
                  className="name-card"
                  onClick={() => setSelectedName(name)}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {selectedName && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={closeHoverBox}>&times;</button>

            <div className="modal-image-wrapper">
              <img
                src={`images/ayurvedics/${selectedName}.webp`} // First attempt
                alt={selectedName}
                className="modal-image"
                onError={(e) => {
                  // Fallback sequence when image fails to load
                  const fallbackFormats = ['.jpg', '.jpeg', '.png', '.avif'];
                  for (let ext of fallbackFormats) {
                    const fallbackSrc = `images/ayurvedics/${selectedName}${ext}`;
                    const img = new Image();
                    img.src = fallbackSrc;
                    img.onload = () => {
                      e.target.src = fallbackSrc;
                    };
                  }
                }}
              />
              <div className="modal-blur-overlay" />
            </div>


            <div className="modal-content">
              <h2>{selectedName}</h2>
              <div className="modal-content-list">
  {(ayurvedicsData[selectedName] || []).map((item, i) => (
    <p key={i}>
      <strong>{item.heading}</strong>
      {item.botanical && ` (${item.botanical})`}: {item.uses}
    </p>
  ))}
</div>

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

export default Ayurvedics;
