var _ = require('lodash')
var assert = require('assert')
var Wreck = require('wreck')

module.exports = Self

function Self(options) {
    assert(_.isNumber(options.interval))
    assert(_.isString(options.url))
    this.interval = options.interval
    this.url = options.url
}

_.extend(Self.prototype, {

    nudge: function () {
        Wreck.get(this.url, function (err) {
            if (err) throw err
            setTimeout(this.nudge.bind(this), this.interval)
        }.bind(this))
    },

})

_.extend(Self, {

    create: function (options) {
        return new Self(options)
    },

})
