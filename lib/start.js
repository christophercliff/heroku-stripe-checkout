var stop = require('./stop')

process
    .once('uncaughtException', stop.stopAndExit)
    .once('unhandledRejection', stop.stopAndExit)
    .once('SIGINT', stop.stopAndExit)

require('./server')
    .once('request-error', function (server, err) {
        stop.stopAndExit(err)
    })
    .start(function (err) {
        if (err) throw err
    })
