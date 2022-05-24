import React from 'react'
import SmartLink from '../SmartLink'
import Button from '../Button'
import SocialIcon, { ISocialIconProps } from './SocialIcon'
import mlemLogo from '../../images/mlem-logo.png'
import OtherToolsPopup from './OtherToolsPopup'
import Alert from './Alert'
import * as styles from './index.module.css'

const socialLinks: Array<ISocialIconProps> = [
  {
    icon: 'youtube',
    href: 'https://www.youtube.com/channel/UC37rp97Go-xIX3aNFVHhXfQ',
    label: 'Go to DVCorg Youtube'
  },
  {
    icon: 'discord',
    href: '/chat',
    label: 'Go to DVC Discord',
    target: '_blank'
  }
]

const NavBar: React.FC = () => {
  return (
    <header className={styles.header}>
      <Alert collapsed={false} />
      <nav className={styles.nav}>
        <SmartLink href="/" className={styles.nav__logoLink}>
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
        <SmartLink href="/doc" className={styles.nav__link}>
          Docs
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
          {socialLinks.map(({ icon, href, label, target }, i) => (
            <li key={i}>
              <SocialIcon
                target={target}
                icon={icon}
                href={href}
                label={label}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
