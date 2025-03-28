import React from 'react';
import styles from './SocialAuth.module.css';

function SocialAuth() {
    return (
        <div className={styles.socialAuth}>
            <div className={styles.divider}>
                <span className={styles.dividerText}>OR</span>
            </div>

            <button type="button" className={styles.socialButton}>
                <span className={styles.socialIcon}>f</span>
                Sign in With Facebook
            </button>

            <button type="button" className={styles.socialButton}>
                <span className={styles.socialIcon}>G</span>
                Sign in With Google
            </button>

            <p className={styles.signUpText}>
                New To Here? <a href="/signup">Sign up</a>
            </p>
        </div>
    );
}

export default SocialAuth;