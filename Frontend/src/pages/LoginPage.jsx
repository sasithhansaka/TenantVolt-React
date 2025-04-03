import React from 'react';
import LoginForm from '../components/LoginPage_Components/LoginForm';
import SocialAuth from '../components/LoginPage_Components/SocialAuth';
import styles from './LoginPage.module.css';

function LoginPage() {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.formSection}>
                    <LoginForm />
                    <SocialAuth />
                </div>
                <div className={styles.blackSection}></div>
            </div>
        </div>
    );
}

export default LoginPage;