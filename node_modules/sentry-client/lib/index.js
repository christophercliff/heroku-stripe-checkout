var _ = require('lodash')
var assert = require('assert')
var Boom = require('boom')
var BPromise = require('bluebird')
var os = require('os')
var pkg = require('../package.json')
var Wreck = require('wreck')
var url = require('url')
var util = require('util')

var AUTH_HEADER_TEMPLATE = 'Sentry sentry_version=5, sentry_key=%s, sentry_secret=%s, sentry_client=%s/%s'
var PATHNAME_TEMPLATE = '/api/%s/store/'

module.exports = Self

function Self(options) {
    var dsn = url.parse(options.dsn)
    var projectId = parseInt(dsn.pathname.match(/\/(.*)$/)[1])
    var key = dsn.auth.split(':')[0]
    var secret = dsn.auth.split(':')[1]
    this._uri = url.format({
        protocol: dsn.protocol,
        host: dsn.host,
        pathname: util.format(PATHNAME_TEMPLATE, projectId),
    })
    this._authHeader = util.format(AUTH_HEADER_TEMPLATE, key, secret, pkg.name, pkg.version)
    this._hostname = os.hostname()
}

_.extend(Self.prototype, {

    sendError: function (err, options, callback) {
        assert(err instanceof Error)
        if (_.isFunction(options)) {
            callback = options
            options = {}
        }
        return send({
            extra: _.extend({
                stacktrace: err.stack,
            }, options),
            level: 'error',
            message: err.message,
            server_name: this._hostname,
        }, this._uri, this._authHeader).nodeify(callback)
    },

    sendMessage: function (message, options, callback) {
        assert(_.isString(message))
        if (_.isFunction(options)) {
            callback = options
            options = {}
        }
        return send({
            extra: options,
            level: 'info',
            message: message,
            server_name: this._hostname,
        }, this._uri, this._authHeader).nodeify(callback)
    },

})

_.extend(Self, {

    create: function (options) {
        return new Self(options)
    },

})

function send(payload, uri, authHeader) {
    return post(uri, {
        headers: {
            'x-sentry-auth': authHeader,
        },
        payload: JSON.stringify(payload),
    }).spread(function (response, payload) {
        if (response.statusCode !== 200) throw Boom.create(response.statusCode, payload)
        return JSON.parse(payload)
    })
}

function post(uri, options) {
    return new BPromise(function (resolve, reject) {
        Wreck.post(uri, options, function (err, response, payload) {
            if (err) return reject(err)
            return resolve([
                response,
                payload,
            ])
        })
    })
}
