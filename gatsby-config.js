require('dotenv').config()
const path = require('path')

const siteMetadata = {
  title: 'MLEM - Machine Learning Engineering Management',
  description: 'Open-source tool to simplify ML model deployment',
  siteUrl: process.env.HEROKU_APP_NAME
    ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
    : 'https://mlem.ai',
  twitterUsername: '@DVCorg',
  titleTemplate: '%s | MLEM',
  keywords: ['mlem']
}

const plugins = [
  'gatsby-plugin-eslint',
  {
    resolve: '@dvcorg/gatsby-theme-iterative',
    options: {
      simpleLinkerTerms: require('./content/linked-terms'),
      cssBase: path.join(
        'src',
        '@dvcorg',
        'gatsby-theme-iterative',
        'components',
        'Page',
        'base.css'
      ),
      customMediaConfig: {
        importFrom: './src/styles/media.css'
      }
    }
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'MLEM',
      short_name: 'MLEM',
      icon: 'src/images/icon-512x512.png',
      start_url: '/',
      background_color: '#F5F7F8',
      theme_color: '#F5F7F8',
      display: 'standalone',
      icons: [
        {
          src: '/apple-touch-icon-48x48.png',
          sizes: '48x48',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-72x72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-256x256.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: `${__dirname}/src/images`
    }
  },
  'gatsby-plugin-meta-redirect'
]

module.exports = {
  flags: {
    DEV_SSR: process.env.DEV_SSR
  },
  plugins,
  siteMetadata
}
