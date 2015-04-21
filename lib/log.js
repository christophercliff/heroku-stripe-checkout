var BPromise = require('bluebird')
var config = require('./config')
var Sentry = require('sentry-client')

var sentry = (config.sentryDsn) ? Sentry.create({ dsn: config.sentryDsn }) : undefined

module.exports = log

function log(err) {
    var isError = (err instanceof Error)
    if (isError && err.stack) console.error(err.stack)
    if (isError && sentry) return sentry.sendError(err)
    return BPromise.resolve()
}
