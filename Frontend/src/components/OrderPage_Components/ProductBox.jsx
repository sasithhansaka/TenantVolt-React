import React, { useState, useRef } from 'react';
import styles from './ProductBox.module.css';

import { images } from '../../data/ProductBoxImages';

function ProductBox() {
  const [selectedImage, setSelectedImage] = useState(0);
  const mainImageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (mainImageRef.current) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      mainImageRef.current.style.setProperty('--zoom-x', `${x}%`);
      mainImageRef.current.style.setProperty('--zoom-y', `${y}%`);
    }
  };

  return (
    <div className={styles.productBox}>
      <div 
        className={styles.mainImageContainer}
        ref={mainImageRef}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.mainImageWrapper}>
          <img 
            src={images[selectedImage]} 
            alt="Main Product" 
            className={styles.mainImage}
          />
        </div>
      </div>

      <div className={styles.thumbnailContainer}>
        {images.map((image, index) => (
          <div 
            key={index}
            className={`${styles.thumbnail} ${selectedImage === index ? styles.selected : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <div className={styles.thumbnailImageWrapper}>
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                className={styles.thumbnailImage}
              />
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default ProductBox;