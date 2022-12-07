import sentryConfig from '@dvcorg/gatsby-theme-iterative/sentry-config'
import * as Sentry from '@sentry/gatsby'
console.log(sentryConfig)
Sentry.init(sentryConfig)
window.Sentry = Sentry
