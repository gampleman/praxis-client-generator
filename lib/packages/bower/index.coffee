{Package} = require 'dgeni'
Dependencies = require '../dependencies'
JSON = require '../json'
Commands = require '../commands'

module.exports = new Package('Bower', [Dependencies, JSON, Commands])
  .processor 'writeBower', require './write_bower.coffee'
