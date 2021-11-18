import React from 'react'
import NavBar from '../NavBar'
import Header from './Header'
import Features from './Features'

const Home: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <main>
        <Features />
      </main>
    </div>
  )
}

export default Home
