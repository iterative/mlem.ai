import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import SmartLink from '../SmartLink'
import Button from '../Button'
import SocialIcon, { ISocialIconProps } from './SocialIcon'
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
  return (
    <nav className={styles.nav}>
      <SmartLink href="/">
        <StaticImage
          quality={100}
          width={130}
          className={styles.nav__brandLogo}
          placeholder="blurred"
          alt="Go to home page"
          src="../../images/mlem-logo.png"
        />
      </SmartLink>
      <SmartLink
        className={styles.nav__brandCompany}
        href="https://iterative.ai/"
      >
        by <span>iterative.ai</span>
      </SmartLink>
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
  )
}

export default NavBar