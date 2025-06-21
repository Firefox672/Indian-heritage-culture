import React, { useEffect, useState } from 'react';
import './Blob3DViewer.css';

const imageConfigs = [
  { src: 'images/architecture.png', position: [-32.7, 8.8], scale: 7.7 },
  { src: 'images/sankranthi.png', position: [33.5, 10.6], scale: 5.5 },
  { src: 'images/holi.png', position: [-26.5, -8.7], scale: 9.5 },
  { src: 'images/tea.png', position: [18.2, -10.4], scale: 4.5 },
  { src: 'images/sclupture.png', position: [-22.5, 2], scale: 5.5 },
  { src: 'images/spices.png', position: [-17.7, 10.4], scale: 4.5 },
  { src: 'images/tabala.png', position: [22.7, -1.4], scale: 5.5 },
  { src: 'images/tajmahal.png', position: [18.2, 9.4], scale: 5.5 },
  { src: 'images/tribe.png', position: [31.2, -10.4], scale: 7.5 },
  { src: 'images/food.png', position: [-2.0, -10.4], scale: 5.5 },
];

export default function Blob3DViewer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="viewer-container">
      {imageConfigs.map((img, i) => {
        const scaleMultiplier = isMobile ? 2.0 : 1.5;
        const sizeMultiplier = isMobile ? 5.5 : 2.5;

        const xOffset = img.position[0] * scaleMultiplier;
        const yOffset = img.position[1] * -scaleMultiplier;
        const size = `${img.scale * sizeMultiplier}vw`;

        return (
          <img
            key={i}
            src={img.src}
            alt={`img-${i}`}
            className="viewer-image"
            style={{
              left: `calc(50% + ${xOffset}vw)`,
              top: `calc(50% + ${yOffset}vw)`,
              width: size,
            }}
          />
        );
      })}
    </div>
  );
}
