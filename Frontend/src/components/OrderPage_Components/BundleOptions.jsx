import React, { useState } from "react";
import styles from "./BundleOptions.module.css";
import { Bundles } from "../../data/BundlesData.jsx";
import { useNavigate } from "react-router-dom";

function BundleOptions() {
  const [selectedBundle, setSelectedBundle] = useState("1");
  const [quantity, setQuantity] = useState(3); 
  const navigate = useNavigate();

  const handleBundleClick = (id) => {
    setSelectedBundle(id);
    if (id === "3") setQuantity(3);
  };

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleBuyClick = () => {
    let finalQuantity = 1;
    if (selectedBundle === "2") finalQuantity = 2;
    else if (selectedBundle === "3") finalQuantity = quantity;

    console.log("Buying bundle:", selectedBundle, "Quantity:", finalQuantity);
    navigate("/checkout", { 
      state: { 
        selectedBundle: selectedBundle,
        quantity: finalQuantity
      } 
    });
  };

  return (
    <div>
      <div className={styles.bundleSection}>
      <div className={styles.titleContainer}>
        <img 
          src="/images/decorative-left.png" 
          alt=""
          className={styles.decorativeImage}
        />
        <h2 className={styles.bundleTitle}>BUNDLE AND SAVE</h2>
        <img 
          src="/images/decorative-right.png" 
          alt=""
          className={styles.decorativeImage}
        />
      </div>
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
                {bundle.id === "3" && selectedBundle === "3" ? (
                  <div className={styles.quantityControls}>
                    <button 
                      className={styles.quantityButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(-1);
                      }}
                    >
                      -
                    </button>
                    <span className={styles.quantityDisplay}>{quantity}</span>
                    <button 
                      className={styles.quantityButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(1);
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className={styles.discountText}>{bundle.discountText}</div>
                )}
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
    </div>
  );
}

export default BundleOptions;
