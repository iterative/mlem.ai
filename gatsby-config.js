require('dotenv').config()
const path = require('path')

const apiMiddleware = require('@dvcorg/websites-server/src/middleware/api')
const redirectsMiddleware = require('@dvcorg/websites-server/src/middleware/redirects')

const siteMetadata = {
  title: 'MLEM - Simplifying Machine Learning Model Deployment',
  description: 'Ship, serve and productionize ML models faster',
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
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: `${__dirname}/src/images`
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: path.join(__dirname, 'static', 'img')
    }
  },
  {
    resolve: '@dvcorg/gatsby-theme-iterative',
    options: {
      simpleLinkerTerms: require('./content/linked-terms'),
      glossaryInstanceName: false
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
  'gatsby-plugin-meta-redirect'
]

module.exports = {
  flags: {
    DEV_SSR: ['false', 'False', false, 'FALSE'].includes(process.env.DEV_SSR)
      ? false
      : true
  },
  plugins,
  siteMetadata,
  developMiddleware: app => {
    app.use(redirectsMiddleware)
    app.use('/api', apiMiddleware)
  }
}
