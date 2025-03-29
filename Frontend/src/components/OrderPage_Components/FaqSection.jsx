import React, { useState } from 'react';
import styles from './FaqSection.module.css';
import { faqItems } from '../../data/FaqData';

const FaqSection = () => {
    const [faqs, setFaqs] = useState(faqItems);

    const toggleFaq = (id) => {
        setFaqs(faqs.map(faq =>
            faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
        ));
    };

    return (
        <section className={styles.faqSection}>
            <div className={styles.faqContainer}>
                <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>

                <div className={styles.faqList}>
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className={`${styles.faqItem} ${faq.isOpen ? styles.active : ''}`}
                        >
                            <div
                                className={styles.faqHeader}
                                onClick={() => toggleFaq(faq.id)}
                            >
                                <h3 className={styles.question}>{faq.question}</h3>
                                <svg
                                    className={styles.chevron}
                                    width="16"
                                    height="10"
                                    viewBox="0 0 16 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15 1.5L8 8.5L1 1.5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            {faq.isOpen && (
                                <div className={styles.answer}>
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;