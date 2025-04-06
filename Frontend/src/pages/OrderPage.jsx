import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductHeader from "../components/OrderPage_Components/ProductHeader";
import styles from "./OrderPage.module.css";
import FaqSection from "../components/OrderPage_Components/FaqSection";
import Navbar from "./Navbar";
import Footer from "../components/FooterPage_Components/Footer";
import ProductBox from "../components/OrderPage_Components/ProductBox";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

function OrderPage() {
  const [productBoxRef, productBoxInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [productHeaderRef, productHeaderInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [faqRef, faqInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div>
      <Navbar />
      <div className={styles.orderPage}>
        {/* Product Box with animation */}
        <motion.div
          ref={productBoxRef}
          initial="hidden"
          animate={productBoxInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <ProductBox />
        </motion.div>

        {/* Product Header with animation */}
        <motion.div
          ref={productHeaderRef}
          initial="hidden"
          animate={productHeaderInView ? "visible" : "hidden"}
          variants={containerVariants}
          transition={{ delay: 0.2 }}
        >
          <ProductHeader />
        </motion.div>
      </div>

      {/* FAQ Section with animation */}
      <motion.div
        ref={faqRef}
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
        variants={containerVariants}
        transition={{ delay: 0.4 }}
      >
        <FaqSection />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: "500px" }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}

export default OrderPage;