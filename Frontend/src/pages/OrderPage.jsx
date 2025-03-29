import React from 'react';
import ProductHeader from '../components/OrderPage_Components/ProductHeader';
import BundleOptions from '../components/OrderPage_Components/BundleOptions';
import styles from './OrderPage.module.css';

function OrderPage() {
  return (
      <div className={styles.orderPage}>
        <div className={styles.imageSection}></div>
        <div className={styles.contentSection}>
          <ProductHeader />
          <BundleOptions />
        </div>
      </div>
  );
}

export default OrderPage;