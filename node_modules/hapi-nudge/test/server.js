var Hapi = require('hapi')
var Nudge = require('../')

var INTERVAL = 1e3

var server = new Hapi.Server()

module.exports = server

server.app.INTERVAL = INTERVAL

server.connection({
    host: '127.0.0.1',
    port: 3001,
})

server.register({
    register: Nudge,
    options: {
        interval: INTERVAL,
    },
}, function (err) {
    if (err) throw err
})
