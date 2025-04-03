import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const EMAIL = "sasi@gmail.com";
  const PASSWORD = "123456789";
  const USERSTATUS = "pending";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });

    if (email === EMAIL && password === PASSWORD) {
      alert("Login Successful");
      navigate("/dashboard");
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