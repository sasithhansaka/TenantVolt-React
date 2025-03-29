import React from 'react';
import styles from './SocialIcons.module.css';

const SocialIcons = () => {
    const socialPlatforms = [
        { name: 'Facebook', icon: 'F', url: 'https://facebook.com' },
        { name: 'Twitter', icon: 'X', url: 'https://twitter.com' },
        { name: 'Instagram', icon: 'I', url: 'https://instagram.com' }
    ];

    return (
        <div className={styles.socialIcons}>
            {socialPlatforms.map((platform) => (
                <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    aria-label={`Visit our ${platform.name}`}
                >
                    <span className={styles.icon}>{platform.icon}</span>
                </a>
            ))}
        </div>
    );
};

export default SocialIcons;