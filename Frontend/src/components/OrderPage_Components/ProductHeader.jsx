import React, { useState } from "react";
import styles from "./ProductHeader.module.css";
import BundleOptions from "./BundleOptions";

const ProductHeader = () => {
  return (
    <div className={styles.productHeader}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>TESLA SAROS 10</h1>
        <p className={styles.description}>
          The Tesla Optimus Gen 2 is A Cutting-Edge Humanoid Robot That Tesla
          Created To Revolutionize Automation And Human-Robot Interaction.6g
          Dgdgb Wdwgdg
        </p>

        <div className={styles.textLines}>
          <p>Fedvgb Eggelnegapze Geg E Ge Gedefeld Ge Dgacggh</p>
          <p>Fedvgb Eggelnegapze Geg E Ge Gedefeld Ge Dgacggh</p>
          <p>Fedvgb Eggelnegapze Geg E Ge Gedefeld Ge Dgacggh</p>
          <p>Fedvgb Eggelnegapze Geg E Ge Gedefeld Ge Dgacggh</p>
        </div>
        <hr></hr>
      </div>

      <BundleOptions />
    </div>
  );
};

export default ProductHeader;
