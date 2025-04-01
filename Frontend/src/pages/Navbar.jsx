import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/") setActiveLink("Home");
    else if (path === "/order") setActiveLink("order");
    else if (path === "/contact") setActiveLink("Contact");
    else if (path === "/about") setActiveLink("about");
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
            Order Now
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
            href="/about"
            className={`${styles.navLink} ${
              activeLink === "about" ? styles.active : ""
            }`}
            onClick={() => handleNavClick("about")}
          >
            About
          </a>
          <a
            href="/login"
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
