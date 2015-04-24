# This module is used for tracking dependencies
# The actual rendering of dependencies is done in
# language specific writers.
{Package} = require 'dgeni'

module.exports = new Package('Dependencies', [])
  .factory 'dependencies', require './dependencies.coffee'
