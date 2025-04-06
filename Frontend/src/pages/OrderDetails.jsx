import React from 'react';
import styles from './OrderDetails.module.css';

function OrderDetails({ userData, orderStatus, orderDate }) {
  return (
    <div className={styles.orderDetailsContainer}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Membership Details</h2>
        <div className={`${styles.statusIndicator} ${orderStatus === 'completed' ? styles.completed : styles.pending}`}>
          {orderStatus.toUpperCase()}
        </div>
      </div>
      
      <div className={styles.detailsGrid}>
        <div className={styles.detailSection}>
          <h3 className={styles.subtitle}>
            <span className={styles.icon}>👤</span> Owner Information
          </h3>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Full Name</span>
            <span className={styles.detailValue}>
              {userData?.userInfo?.firstName} {userData?.userInfo?.lastName || 'N/A'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Email Address</span>
            <span className={styles.detailValue}>
              {userData?.userInfo?.email || 'N/A'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Phone Number</span>
            <span className={styles.detailValue}>
              {userData?.userInfo?.mobileNumber || 'N/A'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Physical Address</span>
            <span className={styles.detailValue}>
              {userData?.userInfo?.address || 'N/A'}
            </span>
          </div>
        </div>

        {/* Order Information */}
        <div className={styles.detailSection}>
          <h3 className={styles.subtitle}>
            <span className={styles.icon}>📦</span> Order Information
          </h3>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Order Date</span>
            <span className={styles.detailValue}>
              {orderDate || 'N/A'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Membership Tier</span>
            <span className={styles.detailValue}>
              {userData?.orderDetails?.membershipType || 'Standard'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Order Reference</span>
            <span className={styles.detailValue}>
              {userData?.orderDetails?.orderId || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;