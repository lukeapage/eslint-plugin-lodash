'use strict'
const _ = require('lodash')

function fromMessage(message) {
    return fromOptions({errors: [{message}]})
}

function fromOptions(options) {
    return function (testCase) {
        return _.isString(testCase) ? _.assign({code: testCase}, options) : _.assign(testCase, options)
    }
}

module.exports = {
    fromMessage,
    fromVersion3: fromOptions({settings: {lodash: {version: 3}}}),
    fromOptions,
}