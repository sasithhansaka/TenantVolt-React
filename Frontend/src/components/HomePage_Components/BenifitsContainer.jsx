import React from "react";
import styles from "./BenifitsContainer.module.css";

function BenifitsContainer({ images, titles, content }) {
  return (
    <div>
      <div className={styles.benifitsContainer}>
        <h1>
          Why<b> Brand Name</b> Is Awesome?
        </h1>
        <div className={styles.benefits}>
          {images.map((image, index) => (
            <div
              key={index}
              className={styles.benefit}
              style={index === 1 ? { height: "350px" } : {}}
            >
              <div className={styles.icon}>
                <img src={image} alt="feature1" />
              </div>
              <p className={styles.title}>
                {titles[index].split(" ").slice(0, 2).join(" ")} <br /> {titles[index].split(" ").slice(2).join(" ")}
              </p>
              <p className={styles.content}>{content[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BenifitsContainer;
