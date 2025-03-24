import React from "react";
import styles from "./FeaturesContainer.module.css";

function FeaturesContainer() {
  return (
    <div>
      <div className={styles.benefits_container}>
        <h1>
          Why<b> Brand Name</b> Is Awesome?
        </h1>
        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <div className={styles.icon}>
              <img src="./src/images/Flag.png" alt="feature1" />
            </div>
            <p className={styles.title}>
              Efficient Electricity <br></br> Management
            </p>
            <p className={styles.content}>
              Owners Can Identify Rooms With Excessive Power Usage And Take
              Necessary Measures To Optimize Energy Consumption.
            </p>
          </div>

          <div
            className={styles.benefit}
            style={{ width: "290px", height: "360px" }}
          >
            <div className={styles.icon}>
              <img src="./src/images/Dollar.png" alt="feature2" />
            </div>
            <p className={styles.title}>No Monthly Fees</p>
            <p className={styles.content}>
              One Brand Name Card And Unlimited Various Things. Enjoy All The
              Day With Us.
            </p>
          </div>

          <div className={styles.benefit}>
            <div className={styles.icon}>
              <img src="./src/images/Blur.png" alt="feature3" />
            </div>
            <p className={styles.title}>
              Smart IoT<br></br> Integration
            </p>
            <p className={styles.content}>
              {" "}
              Owners Can Monitor Energy Usage Remotely, Improving
              Decision-Making And Operational Efficiency.
            </p>
          </div>

          <div className={styles.benefit}>
            <div className={styles.icon}>
              <img src="./src/images/Alarm Clock.png" alt="feature4" />
            </div>
            <p className={styles.title}>
              Real-Time <br></br> Monitoring
            </p>
            <p className={styles.content}>
              Get instant updates on energy usage, allowing for quicker
              responses and better time management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesContainer;
