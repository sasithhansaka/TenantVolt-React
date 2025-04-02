import React from "react";
import { useEffect, useState } from "react";
import styles from "./MobileApp_Container.module.css";

function MobileApp_Container() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-04-25T00:00:00");

    const updateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateTimeLeft, 1000);
    updateTimeLeft();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", gap: "0px" }}>
        <div className={styles.container_div}>
          <h4>Saros Mobile App</h4>
          <div className={styles.timeslot}>
            <span>
              {timeLeft.days} <br></br>Days
            </span>
            <span>
              {timeLeft.hours} <br></br>Hr
            </span>
            <span>
              {timeLeft.minutes}
              <br></br> Mi
            </span>
            <span>
              {timeLeft.seconds} <br></br>Sc
            </span>
          </div>
          <p className={styles.mobileApp_description}>
            The TENANVOLT Mobile App will launch on April 25, 2025,
            enabling boarding house owners and tenants to track real-time power
            usage, receive consumption alerts, and manage payments directly from
            their smartphones, providing convenient, on-the-go access to fair
            billing and energy savings.
          </p>
          <div className={styles.comingSoon_button}>
            <p className={styles.comingSoon_button_text}>Coming Soon</p>
            <div className={styles.doubleCircle}>
              <img src="./src/images/Double Right.png" alt="" />
            </div>
          </div>
        </div>
        <div>
          <img
            className={styles.mobileApp_image}
            src="./src/images/Mobile app.png"
            alt=""
            style={{
              width: "600px",
              height: "440px",
              marginTop: "-18px",
              marginLeft: "-60px",
            }}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default MobileApp_Container;
