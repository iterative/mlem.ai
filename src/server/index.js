/*
 * Production server.
 *
 * NOTE: This file doesn't go through babel or webpack. Make sure the syntax and
 * sources this file requires are compatible with the current node version you
 * are running.
 */

const express = require('express')
const compression = require('compression')
const { isProduction } = require('./utils')
require('dotenv').config()

const port = process.env.PORT || 3000
const app = express()

const apiMiddleware = require('./middleware/api')
const redirectsMiddleware = require('./middleware/redirects')
const serveMiddleware = require('./middleware/serve')

app.use(compression())
app.use(redirectsMiddleware)
app.use('/api', apiMiddleware)
app.use(serveMiddleware)

app.listen(port, () => {
  console.log(`Listening on http://0.0.0.0:${port}/`)

  if (isProduction) {
    console.log('Serving static files from local')
  }
})
