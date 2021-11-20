import React from 'react'
import NavBar from '../NavBar'
import Header from './Header'
import Features from './Features'
import Footer from '../Footer'

const Home: React.FC = () => {
  return (
    <>
      <NavBar />
      <Header />
      <main>
        <Features />
      </main>
      <Footer />
    </>
  )
}

export default Home
