{Package} = require 'dgeni'
Dependencies = require '../dependencies'
Commands = require '../commands'

module.exports = new Package('Bundler', [Dependencies, Commands])
  .processor 'writeGemfile', require './write_gemfile.coffee'
