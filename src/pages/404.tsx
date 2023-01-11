import SEO from '@dvcorg/gatsby-theme-iterative/src/components/SEO'
import { PageProps } from 'gatsby'
import * as React from 'react'

import NotFound from '../components/NotFound'
import PageLayout from '../components/PageLayout'

const NotFoundPage: React.FC<PageProps> = props => (
  <PageLayout {...props}>
    <SEO title="Page not found!" />
    <NotFound />
  </PageLayout>
)

export default NotFoundPage
