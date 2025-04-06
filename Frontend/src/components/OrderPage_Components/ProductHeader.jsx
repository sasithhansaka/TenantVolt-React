import React, { useState } from "react";
import styles from "./ProductHeader.module.css";
import BundleOptions from "./BundleOptions";

const ProductHeader = () => {
  return (
    <div className={styles.productHeader}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>TENANTVOLT SE-10</h1>
        <p className={styles.description}>
          IoT-powered electricity tracking that gives owners control and tenants
          transparency through real-time usage data and automated billing.
        </p>

        <div className={styles.textLines}>
          <p>
            <span className={styles.bullet}>•</span> Real-time electricity
            monitoring per room
          </p>
          <p>
            <span className={styles.bullet}>•</span> Mobile & web access for
            owners and tenants
          </p>
          <p>
            <span className={styles.bullet}>•</span> Automated billing with
            usage reports
          </p>
          {/* <p>
            <span className={styles.bullet}>•</span> Remote power control for
            non-payers
          </p> */}
        </div>
      </div>

      <BundleOptions />
    </div>
  );
};

export default ProductHeader;
