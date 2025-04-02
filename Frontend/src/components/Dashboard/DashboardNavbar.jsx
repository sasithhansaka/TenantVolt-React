import React, { useState, useEffect } from 'react';
import styles from './DashboardNavbar.module.css';

function DashboardNavbar({ activeTab, setActiveTab }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navItems}>
          {['Home', 'Dashboard', 'Billing'].map((item) => (
            <div
              key={item}
              className={`${styles.navItem} ${activeTab === item ? styles.active : ''}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className={styles.timeDisplay}>
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;