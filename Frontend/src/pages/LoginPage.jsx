import React from 'react';
import LoginForm from '../components/LoginPage_Components/LoginForm';
import SocialAuth from '../components/LoginPage_Components/SocialAuth';
import styles from './LoginPage.module.css';

function LoginPage() {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.formSection}>
                    <h1 className={styles.title}>LOG IN</h1>
                    <p className={styles.subtitle}>Log in to Access Your TenantVolt</p>
                    <LoginForm />
                    <SocialAuth />
                </div>
                <div className={styles.imageSection}></div>
            </div>
        </div>
    );
}

export default LoginPage;