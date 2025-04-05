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
            name: 'Chalana Dewinda',
            role: 'Project Lead & Backend Developer',
            bio: 'Specializes in IoT systems architecture and cloud integration with 3 years of experience in embedded systems',
            image: 'src/assets/team-members/chalana.jpg'
        },
        {
            id: 2,
            name: 'Sasith Hansaka',
            role: 'Frontend Developer & UI Designer',
            bio: 'Expert in React.js and user experience design with a focus on data visualization',
            image: 'src/assets/team-members/sasith.jpg'
        },
        {
            id: 3,
            name: 'Pubudu Hasith',
            role: 'Hardware Engineer',
            bio: 'Electrical engineering specialist with expertise in sensor networks and energy monitoring systems',
            image: 'src/assets/team-members/hasith.jpg'
        }
    ];

    const values = [
        {
            title: 'Innovation',
            description: 'We combine IoT technology with smart analytics to revolutionize property management',
            icon: 'src/assets/icons/innovation.png'
        },
        {
            title: 'Transparency',
            description: 'We believe in clear, verifiable energy usage data to eliminate conflicts between property owners and tenants',
            icon: 'src/assets/icons/transparency.png'
        },
        {
            title: 'Excellence',
            description: 'Our solutions optimize electricity consumption and reduce waste through precise monitoring',
            icon: 'src/assets/icons/excellence.png'
        }
    ];

    return (
        <div>
            <Navbar/>
            <div className={styles.aboutContainer}>
                <section className={styles.heroSection}>
                    <h1>About TenantVolt</h1>
                    <p className={styles.subtitle}>
                        Revolutionizing boarding house electricity management through IoT technology
                    </p>
                </section>

                <section className={styles.storySection}>
                    <h2>Our Story</h2>
                    <div className={styles.timeline}>
                        <div className={styles.timelineItem}>
                            <h3>2023</h3>
                            <p>Identified the growing problem of electricity disputes in boarding houses during our
                                university research</p>
                        </div>
                        <div className={styles.timelineItem}>
                            <h3>2024</h3>
                            <p>Developed the first prototype of our IoT monitoring device and web dashboard</p>
                        </div>
                        <div className={styles.timelineItem}>
                            <h3>2025</h3>
                            <p>Launched TenantVolt as a comprehensive solution for boarding house electricity
                                management</p>
                        </div>
                    </div>
                </section>

                <ValueProposition values={values}/>

                <section className={styles.teamSection}>
                    <h2>Meet The Team</h2>
                    <div className={styles.teamGrid}>
                        {teamMembers.map(member => (
                            <TeamCard key={member.id} member={member}/>
                        ))}
                    </div>
                </section>

                <section className={styles.missionSection}>
                    <h2>Our Mission</h2>
                    <div className={styles.missionContent}>
                        <p className={styles.missionStatement}>
                            At TenantVolt, we're on a mission to transform the rental experience
                            for both tenants and property owners through innovative technology.
                            We believe in creating seamless, transparent, and fair property
                            management solutions that benefit all parties.
                        </p>
                        <div className={styles.missionPoints}>
                            <div className={styles.missionPoint}>
                                <h3>For Tenants</h3>
                                <p>Empowering renters with transparent pricing, easy applications,
                                    and responsive maintenance services.</p>
                            </div>
                            <div className={styles.missionPoint}>
                                <h3>For Owners</h3>
                                <p>Providing landlords with powerful tools to manage properties
                                    efficiently and maximize returns.</p>
                            </div>
                            <div className={styles.missionPoint}>
                                <h3>For Communities</h3>
                                <p>Building better neighborhoods through stable tenancies and
                                    well-maintained properties.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    <Footer/>
</div>
)
    ;
};

export default AboutPage;