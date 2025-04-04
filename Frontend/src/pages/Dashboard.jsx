import React, { useState } from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import Billing from "../components/Dashboard/Billing";
import Details from "../components/Dashboard/Details";
import DashboardHome from "../components/Dashboard/Home";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Home");

  const renderContent = () => {
    switch(activeTab) {
      case 'Home':
        return <DashboardHome/>;
      case 'Dashboard':
        return <Details />;
      case 'Billing':
        return <Billing />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div>
      <DashboardNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;