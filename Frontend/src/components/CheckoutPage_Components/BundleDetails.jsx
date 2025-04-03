import React from "react";
import { Bundles } from "../../data/BundlesData.jsx"; 
import styles from "./BundleDetails.module.css";

function BundleDetails({ id, quantity }) {
  const selectedBundle = Bundles.find(bundle => bundle.id === id) || Bundles[0];
  const calculateTotal = () => {
    if (id === "1") return selectedBundle.price;
    if (id === "2") return selectedBundle.price;
    const basePrice = parseInt(selectedBundle.price.replace(/\D/g, '')) || 2000;
    return `LKR ${(basePrice * quantity).toLocaleString()}.00`;
  };

  return (
    <div className={styles.bundleContainer}>
      <h2 className={styles.bundleTitle}>Your Order Summary</h2>
      <div className={styles.bundleContent}>
        <p className={styles.bundleDetail}>
          <span className={styles.detailLabel}>Package:</span>
          <span className={styles.detailValue}>{selectedBundle.title}</span>
        </p>
        <p className={styles.bundleDetail}>
          <span className={styles.detailLabel}>Quantity:</span>
          <span className={styles.detailValue}>{quantity}</span>
        </p>
        <p className={styles.bundleDetail}>
          <span className={styles.detailLabel}>Unit Price:</span>
          <span className={styles.detailValue}>{selectedBundle.price}</span>
        </p>
        <p className={styles.bundleDetail}>
          <span className={styles.detailLabel}>Discount:</span>
          <span className={`${styles.detailValue} ${styles.discount}`}>
            {selectedBundle.discountAmount}
          </span>
        </p>
        <div className={styles.totalContainer}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalPrice}>{calculateTotal()}</span>
        </div>
      </div>
    </div>
  );
}

export default BundleDetails;