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
      
      <p className={styles.orderDescription}>
        The product you've selected is <strong>{selectedBundle.title}</strong> with a quantity of <strong>{quantity}</strong>. 
        The unit price for this product is <strong>{selectedBundle.price}</strong> and you've received a discount of 
        <strong className={styles.discount}> {selectedBundle.discountAmount}</strong>.
      </p>
      
      <p className={styles.fullPrice}>
        TOTAL AMOUNT: {calculateTotal()}
      </p>
    </div>
  );
}

export default BundleDetails;