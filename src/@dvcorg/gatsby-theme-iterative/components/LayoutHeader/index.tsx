import React from 'react'
import cn from 'classnames'
import SmartLink from '../../../../components/SmartLink'
import Button from '../../../../components/Button'
import SocialIcon, { ISocialIconProps } from './SocialIcon'
import mlemLogo from '../../../../images/mlem-logo.png'
import OtherToolsPopup from './OtherToolsPopup'
import Alert from './Alert'
import * as styles from './index.module.css'
import { useInView } from 'react-intersection-observer'

const socialLinks: Array<ISocialIconProps> = [
  {
    icon: 'github',
    href: 'https://github.com/iterative/mlem/',
    label: 'Go to MLEM github repo'
  },
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
  const { ref, inView } = useInView({ rootMargin: '20px 0px 0px 0px' })
  const scrolled = !inView

  return (
    <>
      <div ref={ref} />

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
            <div className={styles.nav__links}>
              <SmartLink
                href="/doc"
                className={styles.nav__link}
                style={{
                  display: 'flex'
                }}
              >
                Docs
              </SmartLink>
              <SmartLink
                href="https://iterative.ai/blog"
                className={styles.nav__link}
              >
                Blog
              </SmartLink>
              <SmartLink
                href="https://learn.iterative.ai/"
                className={styles.nav__link}
              >
                Course
              </SmartLink>
              <OtherToolsPopup navItemClassName={styles.nav__link} />
            </div>
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
            <Button href="/doc/get-started" className={styles.nav__button}>
              Get Started
            </Button>
          </nav>
        </div>
      </header>
    </>
  )
}

export default NavBar
