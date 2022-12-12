import React from 'react'
import Header from './Header'
import Features from './Features'
import cn from 'classnames'

const Home = () => {
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'flex-nowrap',
        'w-full',
        'max-w-5xl',
        'mx-auto'
      )}
    >
      <Header />
      <Features />
    </div>
  )
}

export default Home
