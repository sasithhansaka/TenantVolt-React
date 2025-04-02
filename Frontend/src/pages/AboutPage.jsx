import React from 'react';
import styles from './AboutPage.module.css';
import TeamCard from '../components/AboutPage_Components/TeamCard';
import ValueProposition from '../components/AboutPage_Components/ValueProposition';
import Navbar from './Navbar';
import Footer from '../components/FooterPage_Components/Footer';

const AboutPage = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'Alex Johnson',
            role: 'Founder & CEO',
            bio: 'Visionary leader with 10+ years in tech innovation',
            image: 'src/assets/team-members/1.jpg'
        },
        {
            id: 2,
            name: 'Sarah Chen',
            role: 'CTO',
            bio: 'Systems architect and blockchain expert',
            image: 'src/assets/team-members/1.jpg'
        },
        {
            id: 3,
            name: 'Marcus Lee',
            role: 'Lead Designer',
            bio: 'Award-winning UI/UX specialist',
            image: 'src/assets/team-members/1.jpg'
        },
        {
            id: 4,
            name: 'Vihidu Putha',
            role: 'Head of Operations',
            bio: 'Expert in scaling tech startups globally',
            image: 'src/assets/team-members/1.jpg'
        }
    ];

    const values = [
        {
            title: 'Innovation',
            description: 'We push boundaries to deliver cutting-edge solutions',
            icon: 'src/assets/icons/ret.svg'
        },
        {
            title: 'Transparency',
            description: 'Open communication at every level',
            icon: 'src/assets/icons/transparency.svg'
        },
        {
            title: 'Excellence',
            description: 'Relentless pursuit of quality',
            icon: 'src/assets/icons/excellence.svg'
        }
    ];

    return (
        <div>
            <Navbar />
        <div className={styles.aboutContainer}>
            <section className={styles.heroSection}>
                <h1>About TenantVolt</h1>
                <p className={styles.subtitle}>
                    Revolutionizing property management through technology
                </p>
            </section>

            <section className={styles.storySection}>
                <h2>Our Story</h2>
                <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                        <h3>2018</h3>
                        <p>Founded in San Francisco with a vision to modernize rentals</p>
                    </div>
                    <div className={styles.timelineItem}>
                        <h3>2020</h3>
                        <p>Launched our flagship property management platform</p>
                    </div>
                    <div className={styles.timelineItem}>
                        <h3>2023</h3>
                        <p>Expanded to 15 countries with 500+ partner properties</p>
                    </div>
                </div>
            </section>

            <ValueProposition values={values} />

            <section className={styles.teamSection}>
                <h2>Meet The Team</h2>
                <div className={styles.teamGrid}>
                    {teamMembers.map(member => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            </section>
        </div>
            <Footer />
        </div>
    );
};

export default AboutPage;