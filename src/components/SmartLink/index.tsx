import React from 'react'
import { Link } from 'gatsby'

interface ISmartLinkProps {
  className?: string
  href: string
  disabled?: boolean
  isExternal?: boolean
  rel?: 'noopener noreferrer'
  target?: '_blank'
}

const SmartLink: React.FC<ISmartLinkProps> = ({
  className = '',
  href,
  disabled,
  isExternal = /^https?:\/\//.test(href),
  rel = isExternal ? 'noopener noreferrer' : undefined,
  target = isExternal ? '_blank' : undefined,
  children
}) => {
  if (disabled) {
    return <span className={className}>{children}</span>
  }

  if (isExternal) {
    return (
      <a className={className} rel={rel} target={target} href={href}>
        {children}
      </a>
    )
  }
  return (
    <Link className={className} ref={rel} target={target} to={href}>
      {children}
    </Link>
  )
}

export default SmartLink
