import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import Navbar from '../Navbar';
import FooterComponent from '../FooterComponent';
import './Architecture.css';

const groupedNames = {
  "Hindu Festivals": [
    "Pan-India “Major” Holidays",
    "Regional or State-level Hindu Festivals",
    "Temple-Centric or Deity-Centred Festivals",
    "Folk-Hindu or Tribal-Influenced Observances"
  ],
  "Islamic Festivals": [
    "Major Pan-India Islamic Holidays",
    "Regional Islamic Commemorations or Urs Festivals"
  ],
  "Sikh Festivals": [
    "Major Sikh Observances",
    "Regional Gurudwara Melas"
  ],
  "Christian Festivals": [
    "Pan-India Christian Observances",
    "Regional or Denominational Celebrations"
  ],
  "Jain Festivals": [
    "Major Jain Observances",
    "Regional Jain Temple Festivals"
  ],
  "Buddhist Festivals": [
    "Pan-Buddhist Observances in India",
    "Region-Specific Celebrations"
  ],
  "Parsi (Zoroastrian) Festivals": [
    "Guinness-Recognized Observances"
  ],
  "Jewish Festivals": [
    "Common Observances (in small Indian Jewish communities)"
  ],
  "Tribal and Indigenous Religious Festivals": [
    "Harvest-Based Tribal Festivals",
    "Rain or Water-Related Ritual Festivals",
    "Ancestral or Spirit-Worship Festivals",
    "Folk-Dance and Music Celebrations (Ritual Theater)"
  ],
  "Seasonal and Harvest Festivals": [
    "Mid-Winter or January Festivals",
    "Spring Festivals (February–April)",
    "Summer Festivals (May–July)",
    "Monsoon and Late Summer Festivals (July–September)",
    "Autumn and Diwali Season (September–November)",
    "Early Winter and Christmas Season (November–January)"
  ],
  "Regional and State Festivals": [
    "North India (Group of States)",
    "West India",
    "East India",
    "Northeast India",
    "South India"
  ],
  "Folk and Tribal Festivals (Distinct from Mainstream Religious)": [
    "Tribal Harvest and Nature Festivals",
    "Folk-Theatre and Ritual Dances (Often Festival-Based)",
    "Village-Level and Clan-Level Rituals"
  ],
  "National and Patriotic Festivals": [
    "Republic Day (January 26)",
    "Independence Day (August 15)",
    "Gandhi Jayanti (October 2)",
    "Swami Vivekananda Jayanti (January 12)",
    "Netaji Subhas Chandra Bose Jayanti (January 23)",
    "Martyrs’ Day (January 30)"
  ],
  "Cultural, Arts and Heritage Festivals": [
    "Classical Dance and Music Festivals",
    "Folk-Arts and Crafts Fairs",
    "Literature and Poetry Festivals",
    "Theatre and Performing-Arts Festivals",
    "Film and Media-Specific Fairs or Conclaves",
    "Heritage and History Festivals"
  ],
  "Food, Wine and Culinary Festivals": [
    "Regional Cuisine Festivals",
    "Wine and Beer Festivals",
    "Street-Food and Chaat Festivals"
  ]
};

const Festivals = () => {
  const [selectedName, setSelectedName] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [festivalsData, setFestivalsData] = useState({});

  const navigate = useNavigate(); // 👈 Initialize navigate

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('data/Festivals_data.json')
      .then(response => response.json())
      .then(data => setFestivalsData(data))
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
    Ayurvedic: '/ayurvedics',
    Crafts: '/crafts',
    Dance: '/dance',
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
        <h1 className="page-heading">Festivals</h1>
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
                src={`images/festivals/${selectedName}.webp`} // 👈 Adjust the path to your image directory
                alt={selectedName}
                className="modal-image"
                onError={(e) => {
                  // Fallback sequence when image fails to load
                  const fallbackFormats = ['.jpg', '.jpeg', '.png', '.avif'];
                  for (let ext of fallbackFormats) {
                    const fallbackSrc = `images/festivals/${selectedName}${ext}`;
                    const img = new Image();
                    img.src = fallbackSrc;
                    img.onload = () => {
                      e.target.src = fallbackSrc;
                    };
                  }
                }}
              />
              <div className="modal-blur-overlay" /></div>
            <div className="modal-content">
              <h2>{selectedName}</h2>
              <p>
                {(festivalsData[selectedName] || []).map((item, i) => (
                  <p key={i}>
                    <strong>{item.heading}:</strong> {item.brief}
                  </p>
                ))}
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

export default Festivals;
