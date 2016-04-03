'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/matches-prop-shorthand')
const RuleTester = require('eslint').RuleTester


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const errors = {
    always: [{message: 'Prefer matches property syntax'}],
    never: [{message: 'Do not use matches property syntax'}]
}
ruleTester.run('matches-prop-shorthand', rule, {
    valid: [
        'var isPublic = _.find([], function (i) { return x.id; });',
        'var r = _.findIndex(this.packages, {name: name});',
        'lang.fonts = _.filter(lang.fonts, function (font) { return font.permissions !== "legacy"});',
        'var isPublic = _.findLastIndex([], function (i) { return i.id == 3; });',
        {
            code: 'var isPublic = _.find([], function(i) { return i.id === 3});',
            options: ['never']
        }, {
          code: 'var isPublic = _.findIndex(arr, (i) => {return i.id === b.id})',
          parserOptions: {ecmaVersion: 6},
          options: ['always', { onlyLiterals: true }]
        }
    ],
    invalid: [{
        code: 'var isPublic = _.find([], function (i) { return i.id === 3; });',
        errors: errors.always
    }, {
        code: 'var isPublic = _.find([], _.matchesProperty("id", 3));',
        errors: errors.always
    }, {
        code: 'var isPublic = _.filter(arr, i => i.id === 3)',
        parserOptions: {ecmaVersion: 6},
        errors: errors.always
    }, {
        code: 'var isPublic = _.filter(arr, ["id", 3])',
        options: ['never'],
        errors: errors.never
    }, {
        code: 'var isPublic = _.filter(arr, "id", 3)',
        options: ['never'],
        errors: errors.never,
        settings: {
            lodash: {version: 3}
        }
    }, {
        code: 'var isPublic = _.find([], i => i[0] === 3);',
        parserOptions: {ecmaVersion: 6},
        errors: errors.always
    }, {
        code: 'var isPublic = _.findIndex(arr, (i) => {return i.id === b.id})',
        parserOptions: {ecmaVersion: 6},
        errors: errors.always
    }, {
        code: 'var isPublic = _.filter(arr, i => i.id === 3)',
        options: ['always', { onlyLiterals: true }],
        parserOptions: {ecmaVersion: 6},
        errors: errors.always
    }]
})
