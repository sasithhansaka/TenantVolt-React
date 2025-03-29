import React from 'react';
import styles from './ValueProposition.module.css';

const ValueProposition = ({ values }) => {
    return (
        <section className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>Our Values</h2>
            <div className={styles.valuesGrid}>
                {values.map((value, index) => (
                    <div key={index} className={styles.valueCard}>
                        <div className={styles.iconContainer}>
                            <img
                                src={value.icon}
                                alt={value.title}
                                className={styles.icon}
                                loading="lazy"
                            />
                        </div>
                        <h3 className={styles.valueTitle}>{value.title}</h3>
                        <p className={styles.valueDescription}>{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ValueProposition;