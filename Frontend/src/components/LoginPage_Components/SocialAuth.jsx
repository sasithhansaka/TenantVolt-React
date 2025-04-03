import React from 'react';
import styles from './SocialAuth.module.css';

function SocialAuth() {
    return (
        <div className={styles.socialAuth}>
            <div className={styles.divider}>
                <span className={styles.dividerLine}></span>
                <span className={styles.dividerText}>OR</span>
                <span className={styles.dividerLine}></span>
            </div>

            <div className={styles.socialButtons}>
                <button type="button" className={styles.socialButton}>
                    <span className={styles.socialIcon}>f</span>
                    Facebook
                </button>
                <button type="button" className={styles.socialButton}>
                    <span className={styles.socialIcon}>G</span>
                    Google
                </button>
            </div>

            <p className={styles.signUpText}>
                New To Here? <a href="/signup">Sign up</a>
            </p>
        </div>
    );
}

export default SocialAuth;