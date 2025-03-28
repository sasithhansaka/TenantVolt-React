import React from 'react'
import Navbar from '../components/HomePage_Components/Navbar.jsx'
import FeaturesContainer from '../components/HomePage_Components/FeaturesContainer.jsx'
import MobileApp_Container from '../components/HomePage_Components/MobileApp_Container.jsx'
import { images, titles, content } from '../data/FeatureData.jsx';


function Home() {

//  hiiiii
  return (
    <div>
      <Navbar/>
      <FeaturesContainer 
       images={images}
       titles={titles}
       content={content}
      />
      <MobileApp_Container/>
    </div>
  )
}

export default Home
