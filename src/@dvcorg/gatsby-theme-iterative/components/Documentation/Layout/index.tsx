import React, { PropsWithChildren, Reducer, useEffect, useReducer } from 'react'
import cn from 'classnames'
import { SkipNavContent } from '@reach/skip-nav'

import LayoutWidthContainer from '@dvcorg/gatsby-theme-iterative/src/components/LayoutWidthContainer'
import HamburgerIcon from '@dvcorg/gatsby-theme-iterative/src/components/HamburgerIcon'
import SidebarMenu from '@dvcorg/gatsby-theme-iterative/src/components/Documentation/Layout/SidebarMenu'
import { matchMedia } from '@dvcorg/gatsby-theme-iterative/src/utils/front/breakpoints'
import { focusElementWithHotkey } from '@dvcorg/gatsby-theme-iterative/src/utils/front/focusElementWithHotkey'

import * as styles from '@dvcorg/gatsby-theme-iterative/src/components/Documentation/Layout/styles.module.css'
import { useWindowSize } from 'react-use'

const toggleReducer: Reducer<boolean, void> = state => !state

const Layout: React.FC<PropsWithChildren<{ currentPath: string }>> = ({
  children,
  currentPath
}) => {
  const [isMenuOpen, toggleMenu] = useReducer(toggleReducer, false)

  const windowSize = useWindowSize()

  useEffect(() => {
    if (matchMedia('--xs-scr')) {
      return
    }
    const closeEventListener = focusElementWithHotkey('#doc-search', '/')
    return closeEventListener
  }, [windowSize])

  return (
    <LayoutWidthContainer className={styles.container} wide>
      {/* eslint-disable jsx-a11y/no-static-element-interactions */}
      {/* eslint-disable jsx-a11y/click-events-have-key-events */}
      <div
        className={cn(styles.backdrop, isMenuOpen && styles.opened)}
        onClick={toggleMenu}
      />
      {/* eslint-enable jsx-a11y/no-static-element-interactions */}
      {/* eslint-enable jsx-a11y/click-events-have-key-events */}

      <button
        className={cn(styles.sideToggle, isMenuOpen && styles.opened)}
        onClick={toggleMenu}
      >
        <HamburgerIcon />
      </button>

      <div className={cn(styles.side, isMenuOpen && styles.opened)}>
        <SidebarMenu
          currentPath={currentPath}
          onClick={(isLeafItemClicked: boolean): void => {
            if (matchMedia('--xs-scr') && isLeafItemClicked) {
              toggleMenu()
            }
          }}
        />
      </div>
      <div className={styles.content}>
        <SkipNavContent id="main-content" />
        {children}
      </div>
    </LayoutWidthContainer>
  )
}

export default Layout
