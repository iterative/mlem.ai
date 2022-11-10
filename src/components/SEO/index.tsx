import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

interface ISEOProps {
  title?: string
  description?: string
  image?: string
  imageHeight?: string
  imageWidth?: string
  imageAlt?: string
  article?: string
}

const defaultSocialImage = '/social-share.png'

const SEO: React.FC<ISEOProps> = ({
  title,
  description,
  image,
  imageHeight,
  imageWidth,
  imageAlt,
  article
}) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  const {
    title: defaultTitle,
    titleTemplate,
    description: defaultDescription,
    siteUrl,
    twitterUsername
  } = site.siteMetadata
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultSocialImage}`,
    imageWidth: imageWidth || '2400',
    imageHeight: imageHeight || '1260',
    imageAlt:
      imageAlt ||
      'The MLEM company logo next to the word "mlem" in front of a white background.',
    url: `${siteUrl}${pathname}`
  }
  return (
    <Helmet
      title={seo.title}
      titleTemplate={titleTemplate}
      defaultTitle={defaultTitle}
    >
      <html lang="en" />
      <link rel="canonical" href={seo.url} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:site_name" content="MLEM" />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {article ? (
        <meta property="og:type" content="article" />
      ) : (
        <meta property="og:type" content="website" />
      )}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      {seo.imageWidth && (
        <meta property="og:image:width" content={seo.imageWidth} />
      )}
      {seo.imageHeight && (
        <meta property="og:image:height" content={seo.imageHeight} />
      )}
      {seo.imageAlt && <meta name="og:image:alt" content={seo.imageAlt} />}
      <meta name="twitter:site" content="@DVCorg" />
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      {seo.imageAlt && <meta name="twitter:image:alt" content={seo.imageAlt} />}
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0f1624" />
      <script
        defer
        data-domain="mlem.ai"
        src="https://dvc.org/pl/js/script.js"
        data-api="https://dvc.org/pl/api/event"
      ></script>
    </Helmet>
  )
}
export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        titleTemplate
        description
        siteUrl
        twitterUsername
      }
    }
  }
`
