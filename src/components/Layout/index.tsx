import React, { PropsWithChildren } from 'react'
import SEO from '../SEO'
import * as styles from './index.module.css'

interface ILayoutProps {
  title: string
}

const Layout: React.FC<PropsWithChildren<ILayoutProps>> = ({
  children,
  title
}) => {
  return (
    <div className={styles.layout}>
      <SEO title={title} />
      <div className={styles.layout__container}>{children}</div>
    </div>
  )
}

export default Layout
