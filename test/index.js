var async = require('async')
var config = require('../lib/config')
var server = require('../lib/server')
var stripe = require('stripe')(config.stripeSecretKey)
var testServer = require('./server')
var Wreck = require('wreck')

var TIMEOUT = 10e3
var TOKEN_OPTIONS = {
    card: {
        cvc: testServer.app.CARD_CVC,
        exp_month: testServer.app.CARD_EXP_MONTH,
        exp_year: testServer.app.CARD_EXP_YEAR,
        number: testServer.app.CARD_NUMBER,
    },
}

config.errorRedirectUri = 'error'
config.successRedirectUri = 'success'

describe('the server', function () {

    this.timeout(TIMEOUT)

    before(function (done) {
        async.parallel([
            server.start.bind(server),
            testServer.start.bind(testServer),
        ], done)
    })

    after(function (done) {
        async.parallel([
            server.stop.bind(server),
            testServer.stop.bind(testServer),
        ], done)
    })

    it('should error redirect', function (done) {
        stripe.tokens.create(TOKEN_OPTIONS, function (err) {
            if (err) return done(err)
            var postOptions = {
                payload: JSON.stringify({
                    amount: testServer.app.AMOUNT,
                    description: testServer.app.DESCRIPTION,
                    metadata: JSON.stringify(testServer.app.METADATA),
                    stripeToken: 'AN_INVALID_TOKEN',
                    stripeTokenType: 'card',
                    stripeEmail: config.testEmail,
                }),
            }
            Wreck.post(testServer.app.URL, postOptions, function (err, res) {
                if (err) return done(err)
                res.statusCode.should.equal(302)
                res.headers.location.should.equal(config.errorRedirectUri)
                return done()
            })
        })
    })

    it('should success redirect', function (done) {
        stripe.tokens.create(TOKEN_OPTIONS, function (err, token) {
            if (err) return done(err)
            var postOptions = {
                payload: JSON.stringify({
                    amount: testServer.app.AMOUNT,
                    description: testServer.app.DESCRIPTION,
                    metadata: JSON.stringify(testServer.app.METADATA),
                    stripeToken: token.id,
                    stripeTokenType: 'card',
                    stripeEmail: config.testEmail,
                }),
            }
            Wreck.post(testServer.app.URL, postOptions, function (err, res) {
                if (err) return done(err)
                res.statusCode.should.equal(302)
                res.headers.location.should.equal(config.successRedirectUri)
                return done()
            })
        })
    })

})
