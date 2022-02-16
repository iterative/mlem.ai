import * as React from 'react'
import Layout from '../components/Layout'
import NotFound from '../components/NotFound'

const IndexPage: React.FC = () => (
  <Layout title="Page not found!">
    <NotFound />
  </Layout>
)

export default IndexPage
