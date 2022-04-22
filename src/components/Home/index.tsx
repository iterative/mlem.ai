import React from 'react'
import Header from './Header'
import Features from './Features'
import Footer from '../Footer'

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Features />
      </main>
      <Footer />
    </>
  )
}

export default Home
