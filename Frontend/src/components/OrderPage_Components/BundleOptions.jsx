import React, { useState } from "react";
import styles from "./BundleOptions.module.css";
import { Bundles } from "../../data/BundlesData.jsx";
import { useNavigate } from "react-router-dom";

function BundleOptions() {
  const [selectedBundle, setSelectedBundle] = useState("1");
  const navigate = useNavigate();
  const handleBundleClick = (id) => {
    setSelectedBundle(id);
  };

  const handleBuyClick = () => {
    console.log("Buying bundle:", selectedBundle);
    navigate("/checkout", { state: { selectedBundle: selectedBundle } });
  };
  return (
    <div>
      <div className={styles.bundleSection}>
        <h2 className={styles.bundleTitle}>BUNDLE AND SAVE</h2>

        <div className={styles.bundleOptions}>
          {Bundles.map((bundle) => (
            <div
              key={bundle.id}
              className={`${styles.bundleOption} ${
                selectedBundle === bundle.id ? styles.selected : ""
              }`}
              onClick={() => handleBundleClick(bundle.id)}
            >
              <div className={styles.optionTopRow}>
                <div className={styles.selectionIndicator}></div>
                <div className={styles.packInfo}>
                  <span className={styles.packTitle}>{bundle.title}</span>
                  <span className={styles.packType}>{bundle.packType}</span>
                </div>
                <div className={styles.shippingBadge}>{bundle.shipping}</div>
                <div className={styles.price}>{bundle.price}</div>
              </div>
              <div className={styles.optionBottomRow}>
                <div className={styles.discountText}>{bundle.discountText}</div>
                <div className={styles.discountAmount}>
                  {bundle.discountAmount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.placeOrder_Button} onClick={handleBuyClick}>
        <p className={styles.placeOrder_ButtonText}>Order Now</p>
        <div className={styles.doubleCircle}>
          <img src="./src/images/Double Right.png" alt="" />
        </div>
      </div>
      {/* <button className={styles.buyButton} onClick={handleBuyClick}>
        BUY PRODUCT
      </button> */}
    </div>
  );
}

export default BundleOptions;
