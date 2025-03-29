import React, { useState } from 'react';
import styles from './CheckOutPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import InputForm from '../components/CheckoutPage_Components/InputForm';
import Navbar from '../components/CheckoutPage_Components/Navbar';

const CheckOutPage = () => {
 

  return (
    <div>
        <Navbar/>
        <InputForm/>

    </div>
  );
};

export default CheckOutPage;