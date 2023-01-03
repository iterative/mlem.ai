import React, { PropsWithChildren, useEffect } from 'react'

import LayoutHeader from '@dvcorg/gatsby-theme-iterative/src/components/LayoutHeader'
import LayoutFooter from '@dvcorg/gatsby-theme-iterative/src/components/LayoutFooter'
import { handleFirstTab } from '@dvcorg/gatsby-theme-iterative/src/utils/front/accessibility'

import './base.css'
import './fonts.css'

import * as styles from './styles.module.css'
import { PageProps } from 'gatsby'
import cn from 'classnames'

export enum LayoutModifiers {
  Wide,
  Collapsed,
  HideAlert
}

export interface ILayoutModifiable {
  modifiers?: Array<LayoutModifiers>
}

interface IMainLayoutProps {
  className?: string
}

export type LayoutComponent = React.FC<
  PropsWithChildren<IMainLayoutProps & PageProps & ILayoutModifiable>
>

const MainLayout: LayoutComponent = ({
  className,
  children,
  modifiers = []
}) => {
  useEffect(() => {
    document.body.classList.add(styles.mainLayout)
    window.addEventListener('keydown', handleFirstTab)

    return (): void => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [])

  return (
    <div className={cn(styles.layoutWrapper, className)}>
      <LayoutHeader modifiers={modifiers} />
      <div id="layoutContent" className={styles.layoutContent}>
        {children}
      </div>
      <LayoutFooter />
    </div>
  )
}

export default MainLayout
