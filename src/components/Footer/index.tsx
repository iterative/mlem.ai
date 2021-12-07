import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import SmartLink from '../SmartLink'
import FooterList, { IFooterListProps } from './FooterList'
import { ReactComponent as IterativeSvg } from '../../images/icons/iterative.svg'
import * as styles from './index.module.css'

const footerListData: Array<IFooterListProps> = [
  {
    title: 'About',
    links: [
      { href: '#overview', text: 'Overview' },
      { href: '#features', text: 'Features' }
    ]
  },
  {
    title: 'Company',
    links: [
      { href: 'https://iterative.ai/about', text: 'About us' },
      { href: 'https://iterative.ai/pricing', text: 'Pricing' },
      { href: 'https://github.com/iterative', text: 'Github' }
    ]
  },
  {
    title: 'Legal',
    links: [
      {
        href: 'https://dvc.org/doc/user-guide/privacy',
        text: 'Privacy Policy'
      },
      { href: 'https://dvc.org/doc/user-guide/privacy', text: 'Terms of use' }
    ]
  },
  {
    title: 'Our Products',
    links: [
      { href: 'https://dvc.org/', text: 'DVC' },
      { href: 'https://cml.dev/', text: 'CML' },
      { href: 'https://studio.iterative.ai/', text: 'Studio' }
    ]
  },
  {
    mobileTitle: 'Community',
    title: 'Join the Community',
    links: [
      { href: 'https://twitter.com/DVCorg', text: 'Twitter', icon: 'twitter' },
      {
        href: 'https://www.linkedin.com/company/iterative-ai/mycompany/',
        text: 'Linkedin',
        icon: 'linkedin'
      },
      {
        href: 'https://www.youtube.com/channel/UC37rp97Go-xIX3aNFVHhXfQ',
        text: 'Youtube',
        icon: 'youtube'
      },
      { href: 'https://github.com/iterative', text: 'Github', icon: 'github' },
      {
        href: 'https://discord.com/invite/dvwXA2N',
        text: 'Discord',
        icon: 'discord'
      }
    ]
  }
]

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__links}>
        {footerListData.map((props, i) => (
          <FooterList key={i} {...props} />
        ))}
      </ul>
      <div className={styles.footer__company}>
        <SmartLink
          className={styles.footer__companyBrand}
          href="https://iterative.ai/"
        >
          <IterativeSvg width={40} height={40} />
          <StaticImage
            className={styles.footer__companyBrandName}
            placeholder="blurred"
            quality={90}
            width={136}
            alt="iterative"
            src="../../images/iterative-text.png"
          />
          <span className="sr-only">Go to iterative site</span>
        </SmartLink>
        <p className={styles.footer__companyText}>
          <span className="block xs:inline">Open platform</span>{' '}
          to operationalize AI
        </p>
      </div>
    </footer>
  )
}

export default Footer
