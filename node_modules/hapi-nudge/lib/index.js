var _ = require('lodash')
var Nudger = require('./nudger')
var pkg = require('../package.json')
var url = require('url')

var DEFAULT_PATHNAME = '/nudge'
var DEFAULT_INTERVAL = 60e3

exports.register = register

register.attributes = {
    pkg: pkg,
}

function register(server, options, next) {
    var pathname = options.pathname || DEFAULT_PATHNAME
    var nudger = Nudger.create({
        url: url.format(_.defaults(options, {
            hostname: server.info.host,
            pathname: pathname,
            port: server.info.port,
            protocol: server.info.protocol,
        })),
        interval: options.interval || DEFAULT_INTERVAL,
    })
    server.route({
        path: pathname,
        method: 'GET',
        config: {
            handler: function (request, reply) {
                return reply({
                    uptime: process.uptime(),
                })
            },
        },
    })
    server.on('start', nudger.nudge.bind(nudger))
    return next()
}
