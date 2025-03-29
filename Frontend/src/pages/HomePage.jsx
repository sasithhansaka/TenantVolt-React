import React from "react";
import Navbar from "../components/HomePage_Components/Navbar.jsx";
import FeaturesContainer from "../components/HomePage_Components/FeaturesContainer.jsx";
import MobileApp_Container from "../components/HomePage_Components/MobileApp_Container.jsx";
import {
  featureImages,
  featureTitles,
  featureContent,
} from "../data/FeatureData.jsx";
import { images, titles, content } from "../data/BenifitsData.jsx";
import BenifitsContainer from "../components/HomePage_Components/BenifitsContainer.jsx";
import styles from "./HomePage.module.css";

function Home() {
  

  return (
    <div>
      <Navbar />
      <BenifitsContainer images={images} titles={titles} content={content} />
      <MobileApp_Container />
      <div className={styles.featuresContainer}>
        <div className={styles.features}>
          <h1>BRAND for teams/coparates </h1>
          <p>Connect your team to your customers and clients with a single tap by leaving an unforgettable first impression.</p>

          <h4>Admin Dashboard to manageyour details the  frghr fvfgb </h4>
          <FeaturesContainer
            images={featureImages}
            titles={featureTitles}
            content={featureContent}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
