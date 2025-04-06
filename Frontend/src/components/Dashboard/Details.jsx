import React from 'react';
import styles from './Details.module.css';
import ElectricityUsage from "./ElectricityUsage.jsx";

function Details() {
  return (
    <div className={styles.details}>
      <h2>Dashboard Details</h2>
      <p>Detailed dashboard information goes here</p>
        <ElectricityUsage></ElectricityUsage>
    </div>
  );
}

export default Details;