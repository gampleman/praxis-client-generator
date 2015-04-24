# This module is used for rendering jasmine specs
{Package} = require 'dgeni'
Dependencies = require '../dependencies'

module.exports = new Package('Jasmine', [Dependencies])
  .factory 'specs', require './specs.coffee'
