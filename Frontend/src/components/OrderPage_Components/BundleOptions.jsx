import React from 'react';
import styles from './BundleOptions.module.css';

function BundleOptions() {
    const bundles = [
        {
            title: "1 PACK",
            shipping: "Free Shipping",
            price: "LKR.2000.00",
            discountText: "STANDARD PRICE",
            discountAmount: "+KR.2300.00"
        },
        {
            title: "2 PACK",
            shipping: "Free Shipping",
            price: "LKR.3500.00",
            discountText: "YOU HAVE 1/OK OFF",
            discountAmount: "+KR.2000.00"
        },
        {
            title: "3 PACK",
            shipping: "Free Shipping",
            price: "LKR.4500.00",
            discountText: "YOU HAVE 1/OK OFF",
            discountAmount: "+KR.2000.00"
        }
    ];

    return (
        <div className={styles.bundleOptions}>
            <h2>BUNDLE AND SAVE</h2>

            <div className={styles.bundleList}>
                {bundles.map((bundle, index) => (
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