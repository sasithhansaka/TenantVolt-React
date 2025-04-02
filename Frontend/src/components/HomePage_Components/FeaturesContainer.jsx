import React, { useState, useEffect } from "react";
import styles from "./FeaturesContainer.module.css";

function FeaturesContainer({ images, titles, content }) {
  const [currentIndex, setCurrentIndex] = useState(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
    }, 6000); 

    return () => clearInterval(interval); 
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