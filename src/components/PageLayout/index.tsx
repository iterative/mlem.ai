import MainLayout from '@dvcorg/gatsby-theme-iterative/src/components/MainLayout'
import { PageProps } from 'gatsby'
import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

import * as styles from './index.module.css'

const PageLayout: React.FC<
  PropsWithChildren<{ location: PageProps['location'] }>
> = props => {
  return (
    <MainLayout {...props}>
      <div className={cn(styles.layout, 'pt-24')}>
        <div className={styles.layout__container}>{props.children}</div>
      </div>
    </MainLayout>
  )
}

export default PageLayout
