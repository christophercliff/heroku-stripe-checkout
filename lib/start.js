var BPromise = require('bluebird')
var server = require('./server')
var stop = require('./stop')

process.on('uncaughtException', stop)
BPromise.onPossiblyUnhandledRejection(stop)

server.start(function (err) {
    if (err) throw err
})
