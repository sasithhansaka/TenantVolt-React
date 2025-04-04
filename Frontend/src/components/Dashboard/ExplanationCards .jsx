import React from 'react';
import styles from './ExplanationCards.module.css';

const ExplanationCards = () => {
  const cards = [
    {
      title: "How We Calculate The Bill",
      content: "Our Robot Can Assist With Voice Commands, Automate Home Tasks, Monitor Security, And Even Interact Using AI. It helps in Daily Activities Like Turning On Lights, Setting Reminders, And Providing Real-Time Updates."
    },
    {
      title: "How We Calculate The Bill",
      content: "Our Robot Can Assist With Voice Commands, Automate Home Tasks, Monitor Security, And Even Interact Using AI. It helps in Daily Activities Like Turning On Lights, Setting Reminders, And Providing Real-Time Updates."
    },
    {
      title: "How We Calculate The Bill",
      content: "Our Robot Can Assist With Voice Commands, Automate Home Tasks, Monitor Security, and Even Interact Using AI. It helps in Daily Activities Like Turning On Lights, Setting Reminders, And Providing Real-Time Updates."
    }
  ];

  return (
    <div className={styles.explanationCards}>
      {cards.map((card, index) => (
        <div key={index} className={styles.card}>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          <p className={styles.cardText}>{card.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ExplanationCards;