import React from 'react';
import styles from './NoteFound.module.css'; // Import the CSS file

function NoteFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page Not Found</p>
      {/* <a href="/" className={styles.homeLink}>
        Go Back to Home
      </a> */}
    </div>
  );
}

export default NoteFound;