var _ = require('lodash')
var Client = require('../')
var dotenv = require('dotenv')

dotenv.load()

var DSN = process.env.SENTRY_DSN
var TIMEOUT = 10e3
var OPTIONS = {
    just_a_test: 'Some test data',
}

describe('Client.create()', function () {

    it('should create the client', function () {
        var client = Client.create({ dsn: 'https://a:b@example.com/1' })
        client.should.be.instanceof(Client)
    })

})

describe('client.sendError()', function () {

    this.timeout(TIMEOUT)

    it('should send an error', function (done) {
        var client = Client.create({ dsn: DSN })
        client.sendError(new Error('An error created by the test runner.'), OPTIONS)
            .then(function (data) {
                data.id.should.be.a.String
            })
            .then(done, done)
    })

    it('should send an error with callbacks', function (done) {
        var client = Client.create({ dsn: DSN })
        client.sendError(new Error('An error created by the test runner.'), OPTIONS, function (err, data) {
            if (err) return done(err)
            data.id.should.be.a.String
            return done()
        })
    })

    it('should send an error with callbacks and no options', function (done) {
        var client = Client.create({ dsn: DSN })
        client.sendError(new Error('An error created by the test runner.'), function (err, data) {
            if (err) return done(err)
            data.id.should.be.a.String
            return done()
        })
    })

    it('should return network errors', function (done) {
        var client = Client.create({ dsn: 'https://a:b@example.com/1' })
        client.sendError(new Error('An error created by the test runner.'), OPTIONS)
            .then(_.noop, function (err) {
                err.isBoom.should.be.true
            })
            .then(done, done)
    })

    it('should return Sentry errors', function (done) {
        var client = Client.create({ dsn: DSN.replace(/\d+$/, '99999') })
        client.sendError(new Error('An error created by the test runner.'), OPTIONS)
            .then(_.noop, function (err) {
                err.isBoom.should.be.true
            })
            .then(done, done)
    })

})

describe('client.sendMessage()', function () {

    this.timeout(TIMEOUT)

    it('should send a message', function (done) {
        var client = Client.create({ dsn: DSN })
        client.sendMessage('A message created by the test runner.', OPTIONS)
            .then(function (data) {
                data.id.should.be.a.String
            })
            .then(done, done)
    })

    it('should send a message with callbacks', function (done) {
        var client = Client.create({ dsn: DSN })
        client.sendMessage('A message created by the test runner.', OPTIONS, function (err, data) {
            if (err) return done(err)
            data.id.should.be.a.String
            return done()
        })
    })

    it('should send a message with callbacks and no options', function (done) {
        var client = Client.create({ dsn: DSN })
        client.sendMessage('A message created by the test runner.', function (err, data) {
            if (err) return done(err)
            data.id.should.be.a.String
            return done()
        })
    })

})
