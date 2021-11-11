const customMedia = require('postcss-custom-media')

module.exports = {
  plugins: [
    customMedia({
      importFrom: './src/styles/media.css'
    }),
    require('postcss-mixins'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer')
  ]
}
