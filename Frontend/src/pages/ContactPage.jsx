import React from 'react';
import styles from './ContactPage.module.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Navbar from "./Navbar.jsx";
import Footer from "../components/FooterPage_Components/Footer.jsx";

const ContactPage = () => {
    return (
        <div>
            <Navbar/>
            <div className={styles.contactPage}>
                <div className={styles.contactContainer}>
                    <h1 className={styles.pageTitle}>Get In Touch</h1>
                    <p className={styles.pageSubtitle}>We'd love to hear from you</p>

                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <FaEnvelope className={styles.contactIcon} />
                            <div>
                                <h3>Email</h3>
                                <a href="mailto:tenantvolt@gmail.com">tenantvolt@gmail.com</a>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <FaPhoneAlt className={styles.contactIcon} />
                            <div>
                                <h3>Hotline</h3>
                                <a href="tel:+94715566789">071 556 6789</a>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <FaMapMarkerAlt className={styles.contactIcon} />
                            <div>
                                <h3>Address</h3>
                                <p>TenantVolt, Galle Road, Matara</p>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <FaClock className={styles.contactIcon} />
                            <div>
                                <h3>Working Hours</h3>
                                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ContactPage;