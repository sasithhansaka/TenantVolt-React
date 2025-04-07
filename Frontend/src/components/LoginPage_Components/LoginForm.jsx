import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import axios from "axios";

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ email, password });

    if(!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://tenantvolt-5cd875450cc3.herokuapp.com/api/auth/login/",
        {
          email,
          password,
        }
      );

      // console.log("Login successful:", response.data);
      alert("Login successful!");

      if (response.data && response.data.success) {
        // Prepare user data object (excluding token)
        const userData = {
          userInfo: {
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            email: response.data.email,
            mobileNumber: response.data.mobile_number,
            address: response.data.address
          },
          orderDetails: {
            orderDateTime: response.data.order_date_time,
            orderStatus: response.data.order_status,
            tenants: response.data.tenants.map(tenant => ({
              name: tenant.name,
              email: tenant.email,
              address: tenant.address,
              productId: tenant.product_id
            }))
          }
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        navigate('/dashboard')

      }

    }  catch (err) {
      console.error("Login error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
    
      if (err.response) {
        if (err.response.status === 401) {
          alert('Invalid email or password');
        } else if (err.response.status === 400) {
          alert('Bad request: Please check your input');
        }
      } else if (err.request) {
        // Request was made but no response received
        alert('Network error: Please check your internet connection');
      } else {
        // Something else happened
        alert('An unexpected error occurred: ' + err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm} noValidate>
      <h1 className={styles.title}>LOG IN</h1>
      <p className={styles.subtitle}>Log in to Access Your TenantVolt</p>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
          autoComplete="username"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
          autoComplete="current-password"
        />
      </div>

      <div className={styles.options}>
        <label className={styles.rememberMe}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className={styles.checkbox}
          />
          Remember Me
        </label>
        <a href="/forgot-password" className={styles.forgotPassword}>
          Forgot Password?
        </a>
      </div>

      <button type="submit" className={styles.loginButton}>
        LOGIN
      </button>
    </form>
  );
}

export default LoginForm;
