import React from "react";
import ProductHeader from "../components/OrderPage_Components/ProductHeader";
import styles from "./OrderPage.module.css";
import FaqSection from "../components/OrderPage_Components/FaqSection";
import Navbar from "./Navbar";
import Footer from "../components/FooterPage_Components/Footer";
import ProductBox from "../components/OrderPage_Components/ProductBox";

function OrderPage() {
  return (
    <div>
      <div>
        <Navbar />
        <div className={styles.orderPage}>
          <div>
            <ProductBox/>
          </div>
          <div>
            <ProductHeader />
          </div>
        </div>
        <FaqSection />
        <div style={{ marginTop: "500px" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
