var _ = require('lodash')
var dotenv = require('dotenv')

dotenv.load()

module.exports = {
    appName: process.env.APP_NAME,
    corsOrigins: parseString(process.env.CORS_ORIGINS) || ['*'],
    currency: process.env.CURRENCY || 'usd',
    errorRedirectUri: process.env.ERROR_REDIRECT_URI,
    port: process.env.PORT || 3000,
    sentryDsn: process.env.SENTRY_DSN,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    successRedirectUri: process.env.SUCCESS_REDIRECT_URI,
    testEmail: process.env.TEST_EMAIL,
}

function parseString(s) {
    return _.isString(s)
        ? s.split(',').map(function (_s) { return _s.trim() })
        : undefined
}
