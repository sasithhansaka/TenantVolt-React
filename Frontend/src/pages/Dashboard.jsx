import React, { useState, useEffect } from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import Billing from "../components/Dashboard/Billing";
import Details from "../components/Dashboard/Details";
import DashboardHome from "../components/Dashboard/Home";
import Connection from "../components/Dashboard/Connection";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from localStorage
    const data = JSON.parse(localStorage.getItem("userData"));
    setUserData(data);
    
    // If order is pending, force Home tab
    if (data?.orderDetails?.orderStatus === "pending") {
      setActiveTab("Home");
    }
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'Home':
        return <DashboardHome />;
      case 'Dashboard':
        return userData?.orderDetails?.orderStatus !== "pending" ? <Details /> : <DashboardHome />;
      case 'Billing':
        return userData?.orderDetails?.orderStatus !== "pending" ? <Billing /> : <DashboardHome />;
      case 'Connections':
        return userData?.orderDetails?.orderStatus !== "pending" ? <Connection /> : <DashboardHome />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardNavbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        orderStatus={userData?.orderDetails?.orderStatus || "pending"} 
      />
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;