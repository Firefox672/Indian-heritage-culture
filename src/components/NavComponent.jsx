import React, { useEffect, useRef, useState, Suspense } from 'react';
import { CSSTransition } from 'react-transition-group';
import './NavComponent.css';
import Blob3DViewer from './Blob3DViewer'; // Assumed to be a heavy component
import { useNavigate } from 'react-router-dom';

const NavComponent = ({ onTitleVisibleChange }) => {
  const navBodyRef = useRef(null);
  const [showTitle, setShowTitle] = useState(false);
  const [isBlobVisible, setIsBlobVisible] = useState(false); // Visibility state for Blob3DViewer

  const titleWords = 'INDIA HERITAGE & CULTURE'.split(' ');

  const wordRefs = useRef([]);
  if (wordRefs.current.length !== titleWords.length) {
    wordRefs.current = Array(titleWords.length)
      .fill()
      .map(() => React.createRef());
  }

  // Observe title appearance for navbar text visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const show = !entry.isIntersecting && rect.top <= 80;

        setShowTitle(show);
        onTitleVisibleChange?.(show);
      },
      {
        root: null,
        threshold: 0.5,
        rootMargin: '-80px 0px 0px 0px',
      }
    );

    const h2Element = navBodyRef.current?.querySelector('h2');
    if (h2Element) observer.observe(h2Element);
    return () => h2Element && observer.unobserve(h2Element);
  }, [onTitleVisibleChange]);

  // Track visibility of Blob3DViewer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsBlobVisible(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );

    const navBodyEl = navBodyRef.current;
    if (navBodyEl) observer.observe(navBodyEl);

    return () => navBodyEl && observer.unobserve(navBodyEl);
  }, []);

  // Scroll transforms
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const h2 = navBodyRef.current?.querySelector('h2');
      if (h2) {
        h2.style.transform = `translateY(-${scrollY * 1.0}px)`;
        h2.style.opacity = `${Math.max(1 - scrollY / 100, 0)}`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();
  const handleNavigation =(path) =>{
    navigate(path);
  }


  return (
    <div className="body">
      <div className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top custom-navbar">
        <div className="title-container">
          {titleWords.map((word, index) => {
            const ref = wordRefs.current[index];
            return (
              <CSSTransition
                key={word + index}
                in={showTitle}
                timeout={300}
                classNames="fade-up"
                nodeRef={ref}
                appear
                unmountOnExit
              >
                <span
                  ref={ref}
                  className="title-word"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {word}
                </span>
              </CSSTransition>
            );
          })}
        </div>

<ul className="nav-items">
<li onClick={() => handleNavigation('/')}>Home</li>
<li onClick={() => handleNavigation('/aboutus')}>About Us</li>
<li onClick={() => handleNavigation('/explore')}>Explore</li>
<li onClick={() => handleNavigation('/contactus')}>Contact Us</li>
</ul>

      </div>

      <div className="navBody" ref={navBodyRef}>
        <Suspense fallback={null}>
          {isBlobVisible && <Blob3DViewer />}
        </Suspense>
        <h2 className='blurred-text'>
          INDIA's<br />HERITAGE &<br />CULTURE
        </h2>
      </div>
    </div>
  );
};

export default NavComponent;
