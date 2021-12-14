import React, { useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import SmartLink from '../SmartLink'
import Button from '../Button'
import SocialIcon, { ISocialIconProps } from './SocialIcon'
import mlemLogo from '../../images/mlem-logo.png'
import { ReactComponent as DownSVG } from '../../images/icons/down.svg'
import OtherToolsPopup from './OtherToolsPopup'
import * as styles from './index.module.css'

const socialLinks: Array<ISocialIconProps> = [
  {
    icon: 'linkedin',
    href: 'https://www.linkedin.com/company/iterative-ai',
    label: 'Go to Iterative LinkedIn'
  },
  {
    icon: 'twitter',
    href: 'https://twitter.com/DVCorg',
    label: 'Go to @DVCorg Twitter'
  },
  {
    icon: 'youtube',
    href: 'https://www.youtube.com/channel/UC37rp97Go-xIX3aNFVHhXfQ',
    label: 'Go to DVCorg Youtube'
  },
  {
    icon: 'discord',
    href: 'https://dvc.org/chat',
    label: 'Go to DVC Discord'
  }
]

const NavBar: React.FC = () => {
  const [isOtherToolsPopupOpen, setIsOtherToolsPopupOpen] = useState(false)
  const otherToolsPopupContainerEl = useRef<HTMLDivElement>(null)
  let pageCloseEventListener: () => void = () => null
  let keyupCloseEventListener: () => void = () => null

  useEffect(() => {
    return () => {
      pageCloseEventListener()
      keyupCloseEventListener()
    }
  }, [])

  const handlePageClick = (event: MouseEvent): void => {
    if (
      otherToolsPopupContainerEl.current &&
      !otherToolsPopupContainerEl.current.contains(event.target as Node)
    ) {
      closeOtherToolsPopup()
    }
  }

  const handlePageKeyup = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      closeOtherToolsPopup()
    }
  }

  const setupPopupEventListeners = (): void => {
    document.addEventListener('click', handlePageClick)
    document.addEventListener('keyup', handlePageKeyup)

    pageCloseEventListener = (): void =>
      document.removeEventListener('click', handlePageClick)
    keyupCloseEventListener = (): void =>
      document.removeEventListener('keyup', handlePageKeyup)
  }

  const closeOtherToolsPopup = (): void => {
    pageCloseEventListener()
    keyupCloseEventListener()
    setIsOtherToolsPopupOpen(false)
  }

  const openOtherToolsPopup = (): void => {
    setupPopupEventListeners()
    setIsOtherToolsPopupOpen(true)
  }

  const toggleOtherToolsPopup = (): void => {
    if (isOtherToolsPopupOpen) {
      closeOtherToolsPopup()
    } else {
      openOtherToolsPopup()
    }
  }

  return (
    <>
      <nav className={styles.nav}>
        <SmartLink href="/">
          <img
            alt="Go to home page"
            src={mlemLogo}
            className={styles.nav__brandLogo}
            width={108}
            height={24}
          />
        </SmartLink>
        <SmartLink
          className={styles.nav__brandCompany}
          href="https://iterative.ai/"
        >
          by <span>iterative.ai</span>
        </SmartLink>
        <div
          ref={otherToolsPopupContainerEl}
          className={styles.nav__popupContainer}
        >
          <button onClick={toggleOtherToolsPopup} className={styles.nav__link}>
            Other Tools{' '}
            <DownSVG
              className={cn(isOtherToolsPopupOpen && styles.flip)}
              width={14}
              height={14}
            />
          </button>
          <OtherToolsPopup
            isVisible={isOtherToolsPopupOpen}
            closePopup={closeOtherToolsPopup}
          />
        </div>
        <Button className={styles.nav__button} icon="github" disabled>
          Coming Soon
        </Button>
        <ul className={styles.nav__icons}>
          {socialLinks.map(({ icon, href, label }, i) => (
            <li key={i}>
              <SocialIcon icon={icon} href={href} label={label} />
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default NavBar
