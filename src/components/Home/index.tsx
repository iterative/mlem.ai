import React from 'react'
import Header from './Header'
import Features from './Features'
import * as styles from './index.module.css'

const Home: React.FC = () => {
  return (
    <main className={styles.homeMain}>
      <Header />
      <Features />
    </main>
  )
}

export default Home
