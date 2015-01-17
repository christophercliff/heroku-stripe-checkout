var log = require('./log')
var server = require('./server')

module.exports = stop

function stop(err) {
    return log(err).then(function () {
        server.stop(function () {
            process.exit(1)
        })
    })
}
