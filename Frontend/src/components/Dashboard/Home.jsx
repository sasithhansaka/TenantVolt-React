import React from "react";
import styles from "./DashboardHome.module.css";
import UserDetails from "./UserDetails";
import Deliverystatus from "./Deliverystatus";
import OrderDetails from "../../pages/OrderDetails";

function DashboardHome() {
  const USERNAME = "SASTIH HANSAKA";
  const USERSTATUS = "pending";
  const ORDERDATE="2023-10-01";

  return (
    <div className={styles.dashboardHome}>
      <UserDetails USERNAME={USERNAME} />

      {USERSTATUS === "pending" ? (
        <Deliverystatus ORDERDATE={ORDERDATE} />
      ) : USERSTATUS === "completed" ? (
        <OrderDetails />
      ) : null}
    </div>
  );
}

export default DashboardHome;
