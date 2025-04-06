import React from "react";
import styles from "./BenifitsContainer.module.css";

function BenifitsContainer({ icons, titles, content }) {
  return (
    <div>
      <div className={styles.benifitsContainer}>
        <h1>
          Why<b> TENANVOLT</b> Is Awesome?
        </h1>
        <div className={styles.benefits}>
          {icons.map((icon, index) => (
            <div
              key={index}
              className={styles.benefit}
              style={index === 1 ? { height: "330px" } : {}}
            >
              <div className={styles.icon}>{icon}</div>
              <p className={styles.title}>
                {titles[index].split(" ").slice(0, 2).join(" ")} <br />{" "}
                {titles[index].split(" ").slice(2).join(" ")}
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
