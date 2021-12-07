import React from 'react'
import cn from 'classnames'
import SmartLink from '../../SmartLink'
import { ReactComponent as DiscordIconSvg } from '../../../images/icons/discord.svg'
import { ReactComponent as YoutubeIconSvg } from '../../../images/icons/youtube.svg'
import { ReactComponent as TwitterIconSvg } from '../../../images/icons/twitter.svg'
import { ReactComponent as LinkedInIconSvg } from '../../../images/icons/linkedin.svg'
import { ReactComponent as GithubIconSvg } from '../../../images/icons/github.svg'
import * as styles from './index.module.css'

export interface IFooterListProps {
  title: string
  mobileTitle?: string
  links: Array<{
    text: string
    icon?: 'github' | 'discord' | 'twitter' | 'linkedin' | 'youtube'
    href: string
  }>
}

const icons = {
  discord: (
    <DiscordIconSvg className={styles.list__linkIcon} width={20} height={20} />
  ),
  twitter: (
    <TwitterIconSvg className={styles.list__linkIcon} width={20} height={20} />
  ),
  youtube: (
    <YoutubeIconSvg className={styles.list__linkIcon} width={20} height={20} />
  ),
  linkedin: (
    <LinkedInIconSvg className={styles.list__linkIcon} width={20} height={20} />
  ),
  github: (
    <GithubIconSvg className={styles.list__linkIcon} width={20} height={20} />
  )
}

const FooterList: React.FC<IFooterListProps> = ({
  mobileTitle,
  title,
  links
}) => {
  return (
    <li className={styles.list}>
      {mobileTitle && (
        <h2 className={cn(styles.list__title, 'md:hidden')}>{mobileTitle}</h2>
      )}
      <h2 className={cn(styles.list__title, mobileTitle && 'hidden md:flex')}>
        {title}
      </h2>
      <div className={styles.list__links}>
        {links.map(({ text, href, icon }, i) => (
          <SmartLink className={styles.list__link} key={i} href={href}>
            {icon && icons[icon]}
            {text}
          </SmartLink>
        ))}
      </div>
    </li>
  )
}

export default FooterList
