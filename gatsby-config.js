module.exports = {
  siteMetadata: {
    title: 'mlem.ai',
    description:
      'MLEM is a open-source model registry and deployment tool for machine learning',
    siteUrl: 'https://mlem.ai',
    twitterUsername: '@DVCorg',
    titleTemplate: '%s | MLEM'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true
      }
    },
    'gatsby-plugin-eslint',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        ref: true,
        svgoConfig: {
          plugins: [{ removeViewBox: false }]
        }
      }
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-preact',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'mlem',
        short_name: 'mlem',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'standalone',
        icon: 'src/images/gatsby-icon.png'
      }
    },
    'gatsby-plugin-remove-serviceworker'
  ]
}
