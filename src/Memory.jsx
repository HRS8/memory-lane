import React, { useState, useCallback } from "react";

const Memory = () => {
  const [showImages, setShowImages] = useState(false);
  const [headingScale, setHeadingScale] = useState(1);
  const [imagePositions, setImagePositions] = useState([]);

  const handleScaleChange = useCallback(
      (deltaY) => {
        const scaleChange = deltaY / 500; // adjust the scale factor to your preference
        const newScale = Math.min(Math.max(0.5, headingScale - scaleChange), 1.5);
        setHeadingScale(newScale);

        return newScale;
      },
      [headingScale]
  );

  const handleScroll = (event) => {
    const newScale = handleScaleChange(event.deltaY);

    if (newScale <= 0.5) {
      setShowImages(true);
    } else {
      setShowImages(false);
    }
  };

  const handleScaleEnd = useCallback(() => {
    if (headingScale <= 0.5) {
      setShowImages(true);
    }
  }, [headingScale]);

  const generateRandomPositions = useCallback(() => {
    const positions = [];
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * (window.innerWidth - 200) + 100; // random x position within the screen
      const y = Math.random() * (window.innerHeight - 200) + 100; // random y position within the screen
      const scale = Math.random() * 0.8 + 0.2; // random scale between 0.2 and 1

      positions.push({ x, y, scale });
    }
    setImagePositions(positions);
  }, []);

  useState(() => {
    generateRandomPositions();
  }, []);

  return (
      <div
          className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden"
          onWheel={handleScroll}
      >
        <h1
            className="text-4xl font-bold text-center transition-opacity transition-transform duration-300 ease-in-out heading"
            style={{
              transform: `scale(${headingScale})`,
              opacity: headingScale <= 0.5 ? 0 : 1,
            }}
            onTransitionEnd={handleScaleEnd}
        >
          Memory Game
        </h1>
        {showImages && (
            <div className="absolute">
              {imagePositions.map((position, index) => (
                  <img
                      key={index}
                      src={`https://picsum.photos/200/200?random=${index}`} // using placeholder image with random number as source
                      alt={`memory-${index}`}
                      className="absolute transform hover:scale-110"
                      style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        transform: `scale(${position.scale})`,
                      }}
                  />
              ))}
            </div>
        )}
      </div>
  );
};

export default Memory;