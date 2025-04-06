import React from "react";
import styles from "./DashboardHome.module.css";
import UserDetails from "./UserDetails";
import Deliverystatus from "./Deliverystatus";
import OrderDetails from "../../pages/OrderDetails";
import ExplanationCards from "./ExplanationCards ";
import TenantDetails from "./Tenantdetails";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function DashboardHome() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const USERNAME = userData?.userInfo
    ? `${userData.userInfo.firstName} ${userData.userInfo.lastName}`
    : "Guest User";

  const USERSTATUS = userData?.orderDetails?.orderStatus || "pending";
  const ORDERDATE = userData?.orderDetails?.orderDateTime || "No date available";
  const tenants = userData?.orderDetails?.tenants || [];

  return (
    <motion.div
      className={styles.dashboardHome}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <UserDetails USERNAME={USERNAME} />
      </motion.div>

      <motion.div 
        style={{ display: "flex" }}
        variants={itemVariants}
      >
        <motion.div variants={itemVariants}>
          {USERSTATUS === "pending" ? (
            <Deliverystatus ORDERDATE={ORDERDATE} />
          ) : USERSTATUS === "completed" ? (
            <OrderDetails
              userData={userData}
              orderStatus={USERSTATUS}
              orderDate={ORDERDATE}
            />
          ) : null}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TenantDetails tenants={tenants} />
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.billExplanation}
        variants={itemVariants}
      >
        <h2 className={styles.sectionTitle}>Understanding Your Bill</h2>
        <ExplanationCards />
      </motion.div>
    </motion.div>
  );
}

export default DashboardHome;