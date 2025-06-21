import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import Navbar from '../Navbar';
import FooterComponent from '../FooterComponent';
import './Architecture.css';

const groupedNames = {
  "Prehistoric & Protohistoric: Harappan Civilization (c. 3300–1300 BCE)": [
    "Dholavira",
    "Lothal",
    "Mehrgarh",
    "Mohenjo-daro",
    "Rakhigarhi"
  ],

  "Vedic & Early Iron Age (c. 1500–600 BCE): Painted-Grey Ware Site “Alamgirpur”": [
    "Alamgirpur"
  ],

  "Mahājanapada & Mauryan (c. 600–185 BCE): Barabar Caves": [
    "Lomas Rishi",
    "Sudama Cave",
    "Visva Gaurav"
  ],

  "Śunga–Śātavāhana–Kṣatrapa (c. 185 BCE–300 CE): Amaravati Stupa Complex": [
    "Amaravati Stupa I",
    "Bhaja Chaitya Cave 1",
    "Bhaja Chaitya Cave 2",
    "Kanheri Cave 3"
  ],

  "Gupta & Post-Gupta (c. 4th–6th century CE): Deogarh Vishnu Temple": [
    "Bhitargaon Durga Temple",
    "Deogarh Vishnu Temple",
    "Nachna Baldeo Temple",
    "Tigawa"
  ],

  "Early Medieval Regional: North Indian (Nāgara) – Khajuraho": [
    "Chaneti Temple",
    "Chaturbhuja Temple",
    "Chausath Yogini Temple",
    "Devi Jagadambi Temple",
    "Duladeo",
    "Javari",
    "Kandariya Mahadeva",
    "Lakshmana Temple",
    "Vishvanatha Temple"
  ],

  "Early Medieval Regional: South Indian (Dravidian) – Pallava (Mahābalipuram)": [
    "Cave 1",
    "Cave 2",
    "Five Mandapas",
    "Kailasanatha Temple",
    "Krishna’s Butter Ball",
    "Pancha Rathas (Bhima)",
    "Pancha Rathas (Arjuna)",
    "Shore Temple",
    "Vaikunta Perumal Temple"
  ],

  "Early Medieval Regional: South Indian (Dravidian) – Chola": [
    "Airavatesvara Temple",
    "Annamalaiyar Temple",
    "Brihadeeswarar Temple",
    "Gangaikonda Cholapuram",
    "Sethubandha Ramar"
  ],

  "Early Medieval Regional: Eastern & Northeastern – Bengal (Bishnupur Terracotta Temples)": [
    "Dakhineswar Kali Temple",
    "Jor Bangla Temple",
    "Kantajew Temple",
    "Rasmancha",
    "Rashmoni Ghat Mandir",
    "Shyam Ray Temple"
  ],

  "Jain & Buddhist Temples (c. 5th century CE–Present) – Dilwara (Mt. Abu)": [
    "Luna Vasahi Temple",
    "Meru Temple",
    "Palitana Hilltop Temples",
    "Vimal Vasahi Temple"
  ],

  "Sultanate & Early Indo-Islamic (c. 12th–16th century) – Qutb Complex (Delhi Sultanate)": [
    "Adina Mosque",
    "Alai Darwaza",
    "Atala Masjid",
    "Charminar",
    "Gol Gumbaz",
    "Khirki Mosque",
    "Quwwat al-Islam Mosque",
    "Tomb of Ghiyath al-Din Tughlaq"
  ],

  "Mughal Architecture (c. 1526–1857) – Taj Mahal Complex": [
    "Agra Fort",
    "Fatehpur Sikri",
    "Itimad-ud-Daulah",
    "Red Fort",
    "Taj Mahal (Main Tomb)",
    "Taj Mahal (Jawab)",
    "Taj Mahal (Mosque)",
    "Taj Mahal Garden (Charbagh)"
  ],

  "Regional Hindu Revival & Syncretic (c. 16th–18th century) – Amber Fort (Rājasthān)": [
    "Amer Fort",
    "City Wall",
    "Hawa Mahal",
    "Shekhawati Havelis"
  ],

  "Colonial Period (c. 1498–1947)": [
    "Fort St. David",
    "Fort St. George",
    "Gateway of India",
    "Madras High Court",
    "Pondicherry French Quarter",
    "Ripon Building",
    "Victoria Terminus"
  ],

  "Early 20th Century Modern & Nationalist (c. 1900–1947) – Mumbai Art Deco": [
    "Dadar Art Deco Residences",
    "Eros Cinema",
    "Lincoln House",
    "Regal Cinema"
  ],

  "Post-Independence Modernism & Brutalism (c. 1947–1980s)": [
    "IIT Kharagpur",
    "Meghnad Saha Auditorium",
    "PMO Building"
  ],

  "Late 20th Century Postmodernism & Regionalism (c. 1980s–2000) – Andhra Pradesh Legislative Assembly": [
    "Assembly Hall",
    "Circular Plaza",
    "Public Gallery"
  ],

  "21st Century Contemporary & Sustainable (c. 2000–Present) – Infosys Mysore Campus": [
    "Gajendra Circle",
    "Global Education Centre"
  ]
}

  ;


const Architecture = () => {
  const [selectedName, setSelectedName] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [architectureData, setArchitectureData] = useState({});

  const navigate = useNavigate(); // 👈 Initialize navigate

  useEffect(() => {
    window.scrollTo(0, 0);
    
    fetch('data/Architecture_data.json')
      .then(response => response.json())
      .then(data => setArchitectureData(data))
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
    Ayurvedic: '/ayurvedics',
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
        <h1 className="page-heading">Architecture</h1>
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
                src={`images/architecture/${selectedName}.webp`} // First attempt
                alt={selectedName}
                className="modal-image"
                onError={(e) => {
                  // Fallback sequence when image fails to load
                  const fallbackFormats = ['.jpg', '.jpeg', '.png', '.avif'];
                  for (let ext of fallbackFormats) {
                    const fallbackSrc = `images/architecture/${selectedName}${ext}`;
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
              {architectureData[selectedName] ? (
                typeof architectureData[selectedName] === 'string' ? (
                  <p>{architectureData[selectedName]}</p>
                ) : (
                  <div>
                    {Object.entries(architectureData[selectedName]).map(([key, value]) => (
                      <div key={key} className='modal-content-p'>
                        <strong>{key}:</strong> {value}
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <p>No details available for this person.</p>
              )}
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

export default Architecture;
