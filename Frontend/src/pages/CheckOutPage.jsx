import React, { useState } from "react";
import styles from "./CheckOutPage.module.css";
import { useLocation } from "react-router-dom";

import InputForm from "../components/CheckoutPage_Components/InputForm";
import Navbar from "../components/CheckoutPage_Components/Navbar";
import BundleDetails from "../components/CheckoutPage_Components/BundleDetails";

const CheckOutPage = () => {
  const location = useLocation();

  const { selectedBundle } = location.state || {};
  console.log("Selected bundle data:", selectedBundle);

  return (
    <div>
      <Navbar />
      <InputForm />
      <BundleDetails id={selectedBundle} />
    </div>
  );
};

export default CheckOutPage;
