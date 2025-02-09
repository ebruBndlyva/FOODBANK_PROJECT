import React from 'react'
import HeroSection from '../../components/user/Sections/HeroSection'
import OrderSection from '../../components/user/Sections/OrderSection'
import AppSection from '../../components/user/Sections/AppSection'
import CuisineSection from '../../components/user/Sections/CuisineSection'
import RestaurantSection from '../../components/user/Sections/RestauranSection'
import Footer from '../../components/user/Footer'

function Home() {
  return (
    <div style={{marginTop:"70px"}}>
      <HeroSection/>
      <OrderSection/>
      <AppSection/>
      <CuisineSection/>
      <RestaurantSection/>
      <Footer/>
    </div>
  )
}

export default Home