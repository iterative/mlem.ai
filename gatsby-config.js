require('dotenv').config()
const path = require('path')

const apiMiddleware = require('@dvcorg/websites-server/src/middleware/api')
const redirectsMiddleware = require('@dvcorg/websites-server/src/middleware/redirects')

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
  'gatsby-plugin-meta-redirect',
  {
    resolve: '@sentry/gatsby',
    options: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      release: process.env.SOURCE_VERSION,
      enabled: process.env.NODE_ENV === 'production',
      ignoreErrors: [
        /* When we deploy new version we delete assets which were generated for
           the previous deployed version, but users can have opened old version in 
           their browsers. If they hover some link on the page Gatsby.js will try
           fetch old chunks and will get ChunkLoadError, but then will load static
           page from the new deployed version and all will be ok. So we can just
           ignore these type of errors */
        'ChunkLoadError',
        // Random plugins/extensions
        'top.GLOBALS',
        // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
        'originalCreateNotification',
        'canvas.contentDocument',
        'MyApp_RemoveAllHighlights',
        'http://tt.epicplay.com',
        "Can't find variable: ZiteReader",
        'jigsaw is not defined',
        'ComboSearch is not defined',
        'http://loading.retry.widdit.com/',
        'atomicFindClose',
        // Facebook borked
        'fb_xd_fragment',
        // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
        // reduce this. (thanks @acdha)
        // See http://stackoverflow.com/questions/4113268
        'bmi_SafeAddOnload',
        'EBCallBackMessageReceived',
        // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
        'conduitPage'
      ],
      denyUrls: [
        // Facebook flakiness
        /graph\.facebook\.com/i,
        // Facebook blocked
        /connect\.facebook\.net\/en_US\/all\.js/i,
        // Woopra flakiness
        /eatdifferent\.com\.woopra-ns\.com/i,
        /static\.woopra\.com\/js\/woopra\.js/i,
        // Chrome extensions
        /extensions\//i,
        /^chrome:\/\//i,
        // Other plugins
        /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
        /webappstoolbarba\.texthelp\.com\//i,
        /metrics\.itunes\.apple\.com\.edgesuite\.net\//i
      ]
    }
  }
]

module.exports = {
  flags: {
    DEV_SSR:
      process.env.DEV_SSR &&
      ['false', 'False', false, 'FALSE'].includes(process.env.DEV_SSR)
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
