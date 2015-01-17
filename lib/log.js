var BPromise = require('bluebird')
var config = require('./config')
var once = require('once')
var raven = require('raven')

var sentry = config.sentryDsn ? new raven.Client(config.sentryDsn) : undefined

module.exports = log

function log(err) {
    return new BPromise(function (resolve) {
        resolve = once(resolve)
        if (!sentry || !isError(err)) return resolve()
        sentry.on('logged', function () { return resolve() })
        sentry.on('error', function () { return resolve() })
        sentry.captureError(err)
    })
}

function isError(err) {
    return (err instanceof Error)
}
