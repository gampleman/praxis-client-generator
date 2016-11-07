{Package} = require 'dgeni'
PraxisClientGenerator = require '../../index.coffee'
Ruby = require '../ruby'
Dependencies = require '../dependencies'
Overrides = require '../overrides'

module.exports = new Package('RestClient', [PraxisClientGenerator, Ruby, Dependencies, Overrides])
  .processor 'renderCode', require './render_code.coffee'
  .processor 'moduleCreator', require './module_creator.coffee'
  .factory 'paramsGenerator', require './params_generator.coffee'
  .factory 'payloadGenerator', require './payload_generator.coffee'
  .factory 'urlAndHeadersGenerator', require './url_and_headers_generator.coffee'
  .factory 'validation', require './validation.coffee'
