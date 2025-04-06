import React from 'react';
import styles from './OrderDetails.module.css';

function OrderDetails({ userData, orderStatus, orderDate }) {
  return (
    <div className={styles.orderDetailsContainer}>
      <h2 className={styles.sectionTitle}>Membership Details</h2>
      
      <div className={styles.detailsGrid}>
        {/* Owner Information */}
        <div className={styles.detailSection}>
          <h3 className={styles.subtitle}>Owner Information</h3>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Full Name:</span>
            <span className={styles.detailValue}>
              {userData?.userInfo?.firstName} {userData?.userInfo?.lastName}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Email:</span>
            <span className={styles.detailValue}>
              {userData?.userInfo?.email || 'N/A'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Phone:</span>
            <span className={styles.detailValue}>
              {userData?.userInfo?.mobileNumber || 'N/A'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Address:</span>
            <span className={styles.detailValue}>
              {userData?.userInfo?.address || 'N/A'}
            </span>
          </div>
        </div>

        {/* Order Information */}
        <div className={styles.detailSection}>
          <h3 className={styles.subtitle}>Order Information</h3>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Order Date:</span>
            <span className={styles.detailValue}>
              {orderDate || 'N/A'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Status:</span>
            <span className={`${styles.statusBadge} ${
              orderStatus === 'completed' ? styles.completed : styles.pending
            }`}>
              {orderStatus}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Membership Type:</span>
            <span className={styles.detailValue}>
              {userData?.orderDetails?.membershipType || 'Standard'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;