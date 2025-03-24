import React from 'react'
import Navbar from '../components/HomePage_Components/Navbar.jsx'
import FeaturesContainer from '../components/HomePage_Components/FeaturesContainer.jsx'
import MobileApp_Container from '../components/HomePage_Components/MobileApp_Container.jsx'

function Home() {
  return (
    <div>
      <Navbar/>
      <FeaturesContainer/>
      <MobileApp_Container/>
    </div>
  )
}

export default Home
