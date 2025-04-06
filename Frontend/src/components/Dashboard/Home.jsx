import React from "react";
import styles from "./DashboardHome.module.css";
import UserDetails from "./UserDetails";
import Deliverystatus from "./Deliverystatus";
import OrderDetails from "../../pages/OrderDetails";
import ExplanationCards from "./ExplanationCards ";
import TenantDetails from "./Tenantdetails";

function DashboardHome() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const USERNAME = userData?.userInfo
    ? `${userData.userInfo.firstName} ${userData.userInfo.lastName}`
    : "Guest User";

  const USERSTATUS = userData?.orderDetails?.orderStatus || "pending";
  const ORDERDATE =
    userData?.orderDetails?.orderDateTime || "No date available";

  const tenants = userData?.orderDetails?.tenants || [];

  return (
    <div className={styles.dashboardHome}>
      <UserDetails USERNAME={USERNAME} />
      <div style={{ display: "flex" }}>
        <div>
          {USERSTATUS === "pending" ? (
            <Deliverystatus ORDERDATE={ORDERDATE} />
          ) : USERSTATUS === "completed" ? (
            <OrderDetails 
            userData={userData}
            orderStatus={USERSTATUS}
            orderDate={ORDERDATE}
          />          ) : null}
        </div>
        <div>
          <TenantDetails tenants={tenants} />
        </div>
      </div>

      <div className={styles.billExplanation}>
        <h2 className={styles.sectionTitle}>Understanding Your Bill</h2>
        <ExplanationCards />
      </div>
    </div>
  );
}

export default DashboardHome;
