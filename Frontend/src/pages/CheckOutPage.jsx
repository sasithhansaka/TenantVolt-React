import React, { useState } from "react";
// import styles from "./CheckOutPage.module.css";
import { useLocation } from "react-router-dom";
import InputForm from "../components/CheckoutPage_Components/InputForm";
import Navbar from "../components/CheckoutPage_Components/Navbar";

const CheckOutPage = () => {
  const location = useLocation();
  const { selectedBundle, quantity } = location.state || {};

  console.log("Selected bundle:", selectedBundle);
  console.log("Quantity:", quantity);

  return (
    <div>
      {/* <Navbar /> */}
      <InputForm selectedBundle={selectedBundle} quantity={quantity} />
    </div>
  );
};

export default CheckOutPage;