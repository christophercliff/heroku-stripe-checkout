var _ = require('lodash')
var chargeServer = require('../lib/server')
var config = require('../lib/config')
var fs = require('fs')
var Handlebars = require('handlebars')
var Hapi = require('hapi')
var path = require('path')

var AMOUNT = _.random(50, 100)
var CARD_CVC = '123'
var CARD_EXP_MONTH = 12
var CARD_EXP_YEAR = new Date().getFullYear() + 1
var CARD_NUMBER = '4242424242424242'
var DESCRIPTION = 'An automated test transaction.'

var METADATA = {
    a_string: 'a',
    a_number: 1,
}
var PORT = 3001
var TEMPLATE = fs.readFileSync(path.resolve(__dirname, './index.hbs'), 'utf8')
var _URL = [
    chargeServer.info.uri,
    chargeServer.app.PATHNAME,
].join('')

var server = new Hapi.Server()
var template = Handlebars.compile(TEMPLATE)

module.exports = server

_.extend(server.app, {
    AMOUNT: AMOUNT,
    CARD_CVC: CARD_CVC,
    CARD_EMAIL: config.testEmail,
    CARD_EXP_MONTH: CARD_EXP_MONTH,
    CARD_EXP_YEAR: CARD_EXP_YEAR,
    CARD_NUMBER: CARD_NUMBER,
    DESCRIPTION: DESCRIPTION,
    METADATA: METADATA,
    URL: _URL,
})

server.connection({
    port: PORT,
})

server.route({
    path: '/',
    method: 'GET',
    config: {
        handler: function (request, reply) {
            return reply(template({
                amount: AMOUNT,
                description: DESCRIPTION,
                metadata: JSON.stringify(METADATA),
                stripe_publishable_key: config.stripePublishableKey,
                url: _URL,
            }))
        },
    },
})
