import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

export { NoPreRedirectLink } from '@dvcorg/gatsby-theme-iterative/src/components/Link'

export type ILinkProps = {
  children: React.ReactNode
  className?: string
  href: string
  target?: undefined | '_blank'
  state?: unknown
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const PROTOCOL_REGEXP = /^https?:\/\//
const isRelative = (url: string): boolean => !PROTOCOL_REGEXP.test(url)
const isMailto = (url: string): boolean => url.startsWith('mailto:')

export const Link: React.FC<ILinkProps> = ({
  href,
  children,
  rel,
  target,
  download = false,
  className = 'underline text-blue-600 hover:text-blue-800 visited:text-purple-600',
  ...restProps
}) => {
  // Handle all situations where a basic `a` must be used over Gatsby Link
  const hrefIsRelative = isRelative(href)
  const hrefIsMailto = isMailto(href)
  const hrefHasTarget = typeof target === 'string'
  // Fragments within the page should be `a`, but links to other pages
  // that have anchors should be okay.
  const hrefIsRelativeFragment = href.startsWith('#')

  if (
    download ||
    !hrefIsRelative ||
    hrefIsMailto ||
    hrefHasTarget ||
    hrefIsRelativeFragment
  ) {
    /*
       Change external links without an explicit rel to have 'noopener
       noreferrer', but leave explicitly defined rels alone.
       Do the same with `target=_blank`
    */
    if (!hrefIsRelative) {
      if (typeof rel !== 'string') {
        rel = 'noopener noreferrer'
      }
      if (!hrefHasTarget) {
        target = '_blank'
      }
    }

    return (
      <a
        download={download}
        href={href}
        rel={rel}
        target={target}
        className={className}
        {...restProps}
      >
        {children}
      </a>
    )
  }

  return (
    <GatsbyLink to={href} className={className} {...restProps}>
      {children}
    </GatsbyLink>
  )
}

export default Link
