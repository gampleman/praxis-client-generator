{Package} = require 'dgeni'

module.exports = new Package('Overrides', [])
  .factory 'override', require './override.coffee'
  .factory 'o', require './overridable.coffee'
  .factory 'overridable', require './overridable.coffee'
  .factory 'template', require './template.coffee'
