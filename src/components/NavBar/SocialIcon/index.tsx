import React from 'react'
import cn from 'classnames'
import SmartLink from '../../SmartLink'
import { ReactComponent as DiscordIconSvg } from '../../../images/icons/discord.svg'
import { ReactComponent as YoutubeIconSvg } from '../../../images/icons/youtube.svg'
import { ReactComponent as TwitterIconSvg } from '../../../images/icons/twitter.svg'
import { ReactComponent as LinkedInIconSvg } from '../../../images/icons/linkedin.svg'
import { ReactComponent as GithubIconSvg } from '../../../images/icons/github.svg'
import * as styles from './index.module.css'

export interface ISocialIconProps {
  icon: 'github' | 'linkedin' | 'youtube' | 'discord' | 'twitter'
  href: string
  label: string
  className?: string
  target?: '_blank'
}

const icons = {
  discord: <DiscordIconSvg width={16} height={16} />,
  twitter: <TwitterIconSvg width={16} height={16} />,
  youtube: <YoutubeIconSvg width={16} height={16} />,
  linkedin: <LinkedInIconSvg width={16} height={16} />,
  github: <GithubIconSvg width={16} height={16} />
}

const SocialIcon: React.FC<ISocialIconProps> = ({
  className,
  icon,
  href,
  label,
  target
}) => {
  return (
    <SmartLink
      target={target}
      className={cn(className, styles.socialIcon)}
      href={href}
    >
      {icons[icon]}
      <span className="sr-only">{label}</span>
    </SmartLink>
  )
}

export default SocialIcon
