import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    // Set active link based on current URL when component mounts
    const path = window.location.pathname;
    if (path === "/") setActiveLink("Home");
    else if (path === "/order") setActiveLink("order");
    else if (path === "/contact") setActiveLink("Contact");
    else if (path === "/abouth") setActiveLink("Abouth");
    else if (path === "/profile") setActiveLink("Profile");
  }, []);

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>TENANVOLT</div>
        <div className={styles.navItems}>
          <a
            href="/"
            className={`${styles.navLink} ${
              activeLink === "Home" ? styles.active : ""
            }`}
            onClick={() => handleNavClick("Home")}
          >
            Home
          </a>
          <a
            href="/order"
            className={`${styles.navLink} ${
              activeLink === "order" ? styles.active : ""
            }`}
            onClick={() => handleNavClick("order")}
          >
            Order Team
          </a>
          <a
            href="/contact"
            className={`${styles.navLink} ${
              activeLink === "Contact" ? styles.active : ""
            }`}
            onClick={() => handleNavClick("Contact")}
          >
            Contact
          </a>
          <a
            href="/abouth"
            className={`${styles.navLink} ${
              activeLink === "Abouth" ? styles.active : ""
            }`}
            onClick={() => handleNavClick("Abouth")}
          >
            Abouth
          </a>
          <a
            href="/profile"
            className={`${styles.navLink} ${
              activeLink === "Profile" ? styles.active : ""
            }`}
            onClick={() => handleNavClick("Profile")}
          >
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;