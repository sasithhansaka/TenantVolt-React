import React from 'react';
import styles from './UserDetails.module.css';

function UserDetails({ USERNAME }) {
  return (
    <div className={styles.userDetailsContainer}>
      <h1 className={styles.welcomeText}>WELCOME {USERNAME}</h1>
      <p className={styles.description}>
        This Tech Original does 2 x 6.0 BTRg* High Performance Select Tier Tech Ground To Downloaded in Automation and Human-Associationship
      </p>
    </div>
  );
}

export default UserDetails;