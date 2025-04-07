import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FeaturesContainer from "../components/HomePage_Components/FeaturesContainer.jsx";
import MobileApp_Container from "../components/HomePage_Components/MobileApp_Container.jsx";
import { featureImages, featureTitles, featureContent } from "../data/FeatureData.jsx";
import { icons, titles, content } from "../data/BenifitsData.jsx";
import BenifitsContainer from "../components/HomePage_Components/BenifitsContainer.jsx";
import styles from "./HomePage.module.css";
import Navbar from "./Navbar.jsx";
import Footer from "../components/FooterPage_Components/Footer.jsx";
import ModelViewer from "../components/HomePage_Components/ModelViewer.jsx";
import tenantVoltModel from '../../public/TenantVolt.glb';

const containerVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function Home() {
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.1 });
  const [mobileRef, mobileInView] = useInView({ threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1 });

  return (
    <div>
      <Navbar />
      
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        style={{
          marginTop: "150px",
          height: "650px",
          width: "100%",
        }}
      >
          <ModelViewer modelPath={tenantVoltModel} />
      </motion.div>

      <motion.div
        ref={benefitsRef}
        initial="hidden"
        animate={benefitsInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <BenifitsContainer icons={icons} titles={titles} content={content} />
      </motion.div>

      <motion.div
        ref={mobileRef}
        initial="hidden"
        animate={mobileInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <MobileApp_Container />
      </motion.div>

      <motion.div
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={styles.featuresContainer}
      >
        <div className={styles.features}>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            TENANTVOLT for teams/corporates
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Connect boarding houses to smart energy management with a single IoT
            device, delivering transparent electricity tracking and automated
            billing that builds trust between owners and tenants.
          </motion.p>

          <motion.h4
            initial={{ opacity: 0, x: -20 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Monitor and manage all boarding house electricity from one dashboard.
          </motion.h4>
          
          <FeaturesContainer
            images={featureImages}
            titles={featureTitles}
            content={featureContent}
          />
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}

export default Home;
