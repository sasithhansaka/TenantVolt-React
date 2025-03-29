import React, { useState } from 'react';
import styles from './CheckOutPage.module.css';


import InputForm from '../components/CheckoutPage_Components/InputForm';
import Navbar from '../components/CheckoutPage_Components/Navbar';
import BundleDetails from '../components/CheckoutPage_Components/BundleDetails';

const CheckOutPage = () => { 

  const SELECTEDBUNDLE ="1"
  return (
    <div>
        <Navbar/>
        <InputForm/>
        <BundleDetails
        id={SELECTEDBUNDLE}/>

    </div>
  );
};

export default CheckOutPage;