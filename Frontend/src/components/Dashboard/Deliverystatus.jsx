import React from 'react';
import styles from './Deliverystatus.module.css';

function Deliverystatus({ ORDERDATE }) {
  // Calculate delivered date (2 weeks after order date)
  const orderDate = new Date(ORDERDATE);
  const deliveredDate = new Date(orderDate);
  deliveredDate.setDate(deliveredDate.getDate() + 14);

  // Format dates
  const formatDate = (date) => {
    const options = { 
      hour: '2-digit', 
      minute: '2-digit', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour12: true
    };
    return date.toLocaleString('en-US', options).replace(',', '').replace(' ', '_');
  };

  const isDelivered = new Date() > deliveredDate;

  return (
    <div className={styles.deliveryStatus}>
      <h2 className={styles.title}>YOUR TRACKING ORDER</h2>
      
      <div className={styles.statusContainer}>
        <div className={styles.statusItem}>
          <div className={styles.statusDot}></div>
          <div className={styles.statusLine}></div>
          <div className={styles.statusContent}>
            <h3 className={styles.statusTitle}>Ordered Date</h3>
            <p className={styles.statusDate}>{formatDate(orderDate)}</p>
          </div>
        </div>

        <div className={styles.statusItem}>
          <div className={`${styles.statusDot} ${isDelivered ? styles.inactiveDot : styles.activeDot}`}></div>
          <div className={styles.statusLine}></div>
          <div className={styles.statusContent}>
            <h3 className={styles.statusTitle}>On The Way</h3>
            <p className={styles.statusDate}>{isDelivered ? "Delivered" : "Still Not/Delivered"}</p>
          </div>
        </div>

        <div className={styles.statusItem}>
          <div className={`${styles.statusDot} ${isDelivered ? styles.activeDot : styles.inactiveDot}`}></div>
          <div className={styles.statusContent}>
            <h3 className={styles.statusTitle}>Delivered</h3>
            <p className={styles.statusDate}>{formatDate(deliveredDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deliverystatus;