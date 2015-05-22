{Package} = require 'dgeni'
Dependencies = require '../dependencies'

module.exports = new Package('Bundler', [Dependencies])
  .processor 'writeGemfile', require './write_gemfile.coffee'
