import React from 'react'
import SmartLink from '../SmartLink'
import Button from '../Button'
import SocialIcon, { ISocialIconProps } from './SocialIcon'
import mlemLogo from '../../images/mlem-logo.png'
import OtherToolsPopup from './OtherToolsPopup'
import * as styles from './index.module.css'

const socialLinks: Array<ISocialIconProps> = [
  {
    icon: 'discord',
    href: 'https://dvc.org/chat',
    label: 'Go to DVC Discord'
  },
  {
    icon: 'youtube',
    href: 'https://www.youtube.com/channel/UC37rp97Go-xIX3aNFVHhXfQ',
    label: 'Go to DVCorg Youtube'
  }
]

const NavBar: React.FC = () => {
  return (
    <>
      <nav className={styles.nav}>
        <SmartLink href="/">
          <img
            alt="Go to home page"
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
        <SmartLink
          href="https://learn.iterative.ai/"
          className={styles.nav__link}
        >
          Course
        </SmartLink>
        <OtherToolsPopup navItemClassName={styles.nav__link} />
        <Button className={styles.nav__button} icon="github" disabled>
          Coming Soon
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
