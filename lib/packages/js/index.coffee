# NB: This module doesn't actually do very much, except that it packages together
# code that any JS client might find useful.

{Package} = require 'dgeni'

module.exports = new Package('JS', [])
  .processor 'beautify', require './beautify.coffee'
  .factory 'methodName', require './method_name.coffee'
