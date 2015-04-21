var BPromise = require('bluebird')
var log = require('./log')
var server = require('./server')

exports.stopAndExit = stopAndExit
exports.stopServices = stopServices

function stopAndExit(err) {
    log(err)
        .finally(stopServices)
        .finally(function () {
            process.exit(1)
        })
}

function stopServices() {
    return new BPromise(function (resolve, reject) {
        server.stop(function (err) {
            if (err) return reject(err)
            return resolve()
        })
    })
}
