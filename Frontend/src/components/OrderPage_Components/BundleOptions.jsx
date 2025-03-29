import React from "react";
import styles from "./BundleOptions.module.css";
import { Bundles } from "../../data/BundlesData.jsx"; 

function BundleOptions() {
  return (
    <div className={styles.bundleOptions}>
      <h2>BUNDLE AND SAVE</h2>

      <div className={styles.bundleList}>
        {Bundles.map((bundle, index) => (
          <div key={index} className={styles.bundleItem}>
            <h3>{bundle.title}</h3>
            <p className={styles.shipping}>{bundle.shipping}</p>
            <p className={styles.price}>{bundle.price}</p>
            <p className={styles.discountText}>{bundle.discountText}</p>
            <p className={styles.discountAmount}>{bundle.discountAmount}</p>
          </div>
        ))}
      </div>

      <div className={styles.divider}></div>

      <button className={styles.buyButton}>BUY PRODUCT</button>
    </div>
  );
}

export default BundleOptions;
