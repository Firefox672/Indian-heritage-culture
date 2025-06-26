import React, {useEffect, useState} from 'react';
import Routing from './components/Routing';
import './App.css';

function App() {

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 100); // Show button after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <div className="background-overlay">
        <div className="background-blob blob-1"></div>
        <div className="background-blob blob-2"></div>
        <div className="background-blob blob-3"></div>
      </div>
              {showScrollButton && (
                <div className="scroll-to-top" onClick={scrollToTop}>
                  <img src="icons/up.png" alt="⬆️" className='up-arrow' />
                </div>
              )}
      <Routing />
    </div>
  );
}

export default App;
