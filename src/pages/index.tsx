import * as React from 'react'
import Layout from '../components/Layout'
import Home from '../components/Home'
import * as Sentry from '@sentry/gatsby'

const IndexPage: React.FC = () => {
  Sentry.captureMessage('Test message!')
  return (
    <Layout title="Home">
      <button
        onClick={() => {
          throw new Error('Test thrown error!')
        }}
      >
        Throw an error
      </button>
      <Home />
    </Layout>
  )
}

export default IndexPage
