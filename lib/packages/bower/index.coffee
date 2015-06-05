{Package} = require 'dgeni'
Dependencies = require '../dependencies'
JSON = require '../json'
Commands = require '../commands'
SCM = require '../scm'

module.exports = new Package('Bower', [Dependencies, JSON, Commands, SCM])
  .processor 'writeBower', require './write_bower.coffee'
