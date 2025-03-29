import React from 'react';
import styles from './TeamCard.module.css';

const TeamCard = ({ member }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src={member.image}
                    alt={member.name}
                    className={styles.image}
                    loading="lazy"
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>{member.bio}</p>
            </div>
        </div>
    );
};

export default TeamCard;