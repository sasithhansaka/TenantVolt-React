import React, { useState, useEffect } from "react";
import styles from "./FeaturesContainer.module.css";

function FeaturesContainer({ images, titles, content }) {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current feature index

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through features
    }, 6000); // Change feature every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div >
      <div className={styles.oneFeature}>
        
        <img src={images[currentIndex]} alt={titles[currentIndex]} />
        <p className={styles.title}>{titles[currentIndex]}</p>
        <p className={styles.content}>{content[currentIndex]}</p>
      </div>
    </div>
  );
}

export default FeaturesContainer;