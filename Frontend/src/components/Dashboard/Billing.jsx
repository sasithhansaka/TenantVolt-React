import React from 'react';
import styles from './Billing.module.css'; // Assuming you have a CSS module for styling


function Billing() {
  return (
    <div className={styles.billing}>
      <h2>Billing Information</h2>
      <p>Your billing details and history</p>
    </div>
  );
}

export default Billing;