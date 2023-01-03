import * as React from 'react'
import Home from '../components/Home'
import { PageProps } from 'gatsby'
import SEO from '@dvcorg/gatsby-theme-iterative/src/components/SEO'
import PageLayout from '../components/PageLayout'

const IndexPage = (props: PageProps) => (
  <PageLayout {...props}>
    <SEO title="Home" />
    <Home />
  </PageLayout>
)

export default IndexPage
