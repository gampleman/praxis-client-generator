
{Package} = require 'dgeni'
Dependencies = require '../dependencies'
JSON = require '../json'
Commands = require '../commands'
SCM = require '../scm'

module.exports = new Package('NPM', [Dependencies, JSON, Commands, SCM])
  .processor 'writeNPM', require './write_npm.coffee'
