import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './DetailsComponent.css';


const categoryData = [
  { name: 'Indian\'s Architecture', image: 'images/India_Gate.webp', route: 'architecture' },
  { name: 'Indian\'s Dance Forms', image: 'images/indian_dance_form.png' , route: 'dance'},
  { name: 'Indian\'s Festivals', image: 'images/indian_festival.png' , route: 'festivals'},
  { name: 'India\'s Cuisine', image: 'images/indian_food_1.png' , route: 'food'},
  { name: 'Indian\'s Music', image: 'images/indian_music.png', route: 'music' },
  { name: 'Indian\'s Crafts', image: 'images/indian_crafts.png', route: 'crafts' },
  { name: 'Indian\'s Religions', image: 'images/indian_religion.png', route: 'religions' },
  { name: 'India\'s Ayurvedics', image: 'images/indian_ayurvedic.png', route: 'ayurvedics' },
  { name: 'India\'s Historic Palaces', image: 'images/indian_palaces.png', route: 'palaces' },
];

const CategoryBoxes = ({ visibilityArray }) => {
  const [clickedStates, setClickedStates] = useState(
    Array(categoryData.length).fill(false));
  const navigate = useNavigate(); // <-- NEW

  const handleClick = (index, route) => {
    setClickedStates((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });

    setTimeout(() => {
      setClickedStates((prev) => {
        const newStates = [...prev];
        newStates[index] = false;
        return newStates;
      });
      navigate(`/${route}`); // <-- Navigate to route
    }, 200);
  };

  return (
    <>
      <div className="cat-head">
        <h1 className="fade-h1 show">Categories Heading</h1>
      </div>
      <div className="categories">
        {categoryData.map((category, index) => (
          <div
            key={index}
            ref={visibilityArray[index].ref}
            className={`category-box fade-p ${
              visibilityArray[index].visible ? 'show' : ''
            } ${clickedStates[index] ? 'clicked' : ''}`}
            style={{ transitionDelay: `${index * 40}ms` }}
            onClick={() => handleClick(index, category.route)}
          >
            <img
              src={category.image}
              alt={category.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'contain',
              }}
            />
            <h2>{category.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
};


const Explore = ({ isVisible }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200); // reset animation after 0.5s
  };

  return (
    <div
      className={`explore-box ${clicked ? 'clicked' : ''}`}
      onClick={handleClick}
    >
      <h3 className={`fade-h1 ${isVisible ? 'show' : ''}`}>
        Explore More ----&gt;
      </h3>
    </div>
  );
};


function DetailsComponent() {
  const contentRef = useRef(null);
  const exploreRef = useRef(null);

  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isExploreVisible, setIsExploreVisible] = useState(false);

  const [categoryVis, setCategoryVis] = useState(
    Array.from({ length: categoryData.length }, () => ({ visible: false, ref: React.createRef() }))
  );

  const observeVisibility = (ref, setVisible, threshold = 0.3) => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold,
        rootMargin: '-80px 0px 0px 0px',
      }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  };

  useEffect(() => observeVisibility(contentRef, setIsContentVisible, 0.3), []);
  useEffect(() => observeVisibility(exploreRef, setIsExploreVisible, 0.3), []);

  useEffect(() => {
    const observers = categoryVis.map((item, index) => {
      const el = item.ref.current;
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setCategoryVis((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], visible: entry.isIntersecting };
            return updated;
          });
        },
        { root: null, threshold: 0.3 }
      );

      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((observer, i) => {
        if (observer && categoryVis[i].ref.current) {
          observer.unobserve(categoryVis[i].ref.current);
        }
      });
    };
  }, [categoryVis]);

  return (
    <div>
      <div className='contentBox' ref={contentRef}>
        <div className='description'>
          <h1 className={`fade-h1 ${isContentVisible ? 'show' : ''}`}>Content for the Title</h1>
          <br />
          <p className={`fade-p ${isContentVisible ? 'show' : ''}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatum laboriosam repellat deserunt cupiditate qui...
          </p>
        </div>
      </div>

      <div className='cat-boxes'>
        <CategoryBoxes visibilityArray={categoryVis} />
      </div>

      <div ref={exploreRef}>
        <Explore isVisible={isExploreVisible} />
      </div>
    </div>
  );
}

export default DetailsComponent;
