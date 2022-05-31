import React from 'react'
import cn from 'classnames'
import SmartLink from '../SmartLink'
import Button from '../Button'
import SocialIcon, { ISocialIconProps } from './SocialIcon'
import mlemLogo from '../../images/mlem-logo.png'
import OtherToolsPopup from './OtherToolsPopup'
import Alert from './Alert'
import * as styles from './index.module.css'
import { useHeaderIsScrolled } from '@dvcorg/gatsby-theme-iterative/src/utils/front/scroll'

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
  const scrolled = useHeaderIsScrolled()

  return (
    <header>
      <div
        className={cn(
          styles.placeholder,
          scrolled && styles.collapsed,
          styles.withAlert
        )}
      />
      <div className={cn(styles.header, scrolled || styles.hasAlert)}>
        <Alert collapsed={scrolled} />
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
      </div>
    </header>
  )
}

export default NavBar
