
{Package} = require 'dgeni'
Dependencies = require '../dependencies'
JSON = require '../json'

module.exports = new Package('Bower', [Dependencies, JSON])
  .processor 'writeBower', require './write_bower.coffee'
