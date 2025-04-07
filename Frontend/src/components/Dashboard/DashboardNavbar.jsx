import React, { useState, useEffect } from 'react';
import styles from './DashboardNavbar.module.css';

function DashboardNavbar({ activeTab, setActiveTab, orderStatus }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year} ${month} ${day} - ${hours}:${minutes}`;
  };

  const handleTabClick = (tab) => {
    if (orderStatus === 'pending' && (tab === 'Dashboard' || tab === 'Billing'|| tab === 'Connections')) {
      alert('Please wait until your order is processed to access these features');
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navItems}>
          {['Home', 'Dashboard', 'Billing','Connections'].map((item) => {
            const isDisabled = orderStatus === 'pending' && (item === 'Dashboard' || item === 'Billing' || item === 'Connections');
            return (
              <div
                key={item}
                className={`${styles.navItem} ${activeTab === item ? styles.active : ''} ${isDisabled ? styles.disabled : ''}`}
                onClick={() => !isDisabled && handleTabClick(item)}
              >
                {item}
                {isDisabled && <span className={styles.tooltip}></span>}
              </div>
            );
          })}
        </div>
        <div className={styles.timeDisplay}>
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;