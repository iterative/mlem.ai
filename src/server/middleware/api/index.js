const routes = require('express').Router()

const { stars } = require('./github')

routes.get('/github/stars', stars)

module.exports = routes
