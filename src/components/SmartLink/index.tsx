import React, { PropsWithChildren } from 'react'
import { Link } from 'gatsby'

type ISmartLinkProps = {
  className?: string
  href: string
  disabled?: boolean
  isExternal?: boolean
  rel?: 'noopener noreferrer'
  target?: '_blank'
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const SmartLink: React.FC<PropsWithChildren<ISmartLinkProps>> = ({
  className = '',
  href,
  disabled,
  isExternal = /^https?:\/\//.test(href),
  rel = isExternal ? 'noopener noreferrer' : undefined,
  target = isExternal ? '_blank' : undefined,
  children,
  ...attributes
}) => {
  if (disabled) {
    return <span className={className}>{children}</span>
  }

  if (isExternal) {
    return (
      <a
        className={className}
        rel={rel}
        target={target}
        href={href}
        {...attributes}
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      className={className}
      ref={rel}
      target={target}
      to={href}
      {...attributes}
    >
      {children}
    </Link>
  )
}

export default SmartLink
