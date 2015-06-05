{Package} = require 'dgeni'
Dependencies = require '../dependencies'
Commands = require '../commands'

module.exports = new Package('Grunt', [Dependencies, Commands])
  .processor 'writeGruntfile', require './write_gruntfile.coffee'
