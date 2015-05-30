var _ = require('lodash')
var assert = require('assert')
var BPromise = require('bluebird')
var server = require('./server')

describe('the plugin', function () {

    this.timeout(10e3)

    before(function (done) {
        server.start(done)
    })

    after(function (done) {
        server.stop(done)
    })

    it('should create the route', function (done) {
        var route = _.find(server.table(), function (connection) {
            return _.find(connection.table, function (route) {
                return route.method === 'get' && route.path === '/nudge'
            })
        })
        assert(route)
        return done()
    })

    it('should request the route', function (done) {
        var responses = []
        var periods = 5
        server.on('response', function (res) {
            responses.push(res)
        })
        BPromise.delay(periods * server.app.INTERVAL)
            .then(function () {
                _.chain(responses)
                    .pluck('path')
                    .filter(function (path) {
                        return path === '/nudge'
                    })
                    .value()
                    .length.should.equal(periods - 1)
                return done()
            }, done)
    })

})
