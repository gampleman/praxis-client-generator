
{Package} = require 'dgeni'
Dependencies = require '../dependencies'
JSON = require '../json'

module.exports = new Package('NPM', [Dependencies, JSON])
  .processor 'writeNPM', require './write_npm.coffee'
