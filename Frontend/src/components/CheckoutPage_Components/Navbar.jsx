import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <h1 className={styles.logo}>.TENANVOLT</h1>
    </div>
  );
}

export default Navbar;