import React from 'react'
import cn from 'classnames'
import SmartLink from '../SmartLink'
import { ReactComponent as DiscordIconSvg } from '../../images/icons/discord.svg'
import { ReactComponent as YoutubeIconSvg } from '../../images/icons/youtube.svg'
import { ReactComponent as TwitterIconSvg } from '../../images/icons/twitter.svg'
import { ReactComponent as LinkedInIconSvg } from '../../images/icons/linkedin.svg'
import { ReactComponent as GithubIconSvg } from '../../images/icons/github.svg'
import * as styles from './index.module.css'

export interface IButtonProps {
  icon?: 'github' | 'linkedin' | 'youtube' | 'discord' | 'twitter'
  theme?: 'ghost' | 'primary'
  href?: string
  label?: string
  className?: string
  disabled?: boolean
}

const icons = {
  discord: (
    <DiscordIconSvg className={styles.button__icon} width={16} height={16} />
  ),
  twitter: (
    <TwitterIconSvg className={styles.button__icon} width={16} height={16} />
  ),
  youtube: (
    <YoutubeIconSvg className={styles.button__icon} width={16} height={16} />
  ),
  linkedin: (
    <LinkedInIconSvg className={styles.button__icon} width={16} height={16} />
  ),
  github: (
    <GithubIconSvg className={styles.button__icon} width={16} height={16} />
  )
}

const Button: React.FC<IButtonProps> = ({
  icon,
  href,
  theme = 'primary',
  children,
  label,
  className,
  disabled
}) => {
  const allClasses = cn(
    className,
    styles.button,
    !disabled && styles[`button_theme_${theme}`],
    disabled && styles.button_theme_disabled,
    !children && styles.button_iconOnly
  )
  return href ? (
    <SmartLink className={allClasses} href={href} disabled={disabled}>
      {icon && icons[icon]}
      {children}
      <span className="sr-only">{label}</span>
    </SmartLink>
  ) : (
    <button className={allClasses} disabled={disabled}>
      {icon && icons[icon]} {children}
      <span className="sr-only">{label}</span>
    </button>
  )
}

export default Button
