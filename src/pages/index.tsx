import * as React from 'react'
import Home from '../components/Home'
import MainLayout from '@dvcorg/gatsby-theme-iterative/src/components/MainLayout'
import { PageProps } from 'gatsby'

const IndexPage = ({ location }: PageProps) => (
  <MainLayout location={location} className="mt-14">
    <Home />
  </MainLayout>
)

export default IndexPage
