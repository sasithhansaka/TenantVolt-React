import React from 'react';
import { useNavigate } from 'react-router-dom';
import SocialIcons from './SocialIcons';
import styles from './Footer.module.css';

const Footer = () => {
    const navigate = useNavigate();

    const navItems = [
        { label: 'HOME', path: '/' },
        { label: 'CONTACT', path: '/contact' },
        { label: 'ORDER', path: '/order' },
        { label: 'ABOUT', path: '/about' },
        { label: 'PROFILE', path: '/profile' }
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.borderTop}></div>

            <div className={styles.footerContent}>
                <h2 className={styles.logo}>TENANTVOLT</h2>

                <nav className={styles.navigation}>
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            className={styles.navButton}
                            onClick={() => navigate(item.path)}
                            aria-label={`Navigate to ${item.label}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <SocialIcons />
            </div>

            <div className={styles.borderBottom}></div>
        </footer>
    );
};

export default Footer;