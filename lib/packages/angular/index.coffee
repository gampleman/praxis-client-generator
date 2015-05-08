{Package} = require 'dgeni'
PraxisClientGenerator = require '../../index.coffee'
JS = require '../js'
Lodash = require '../lodash'
Dependencies = require '../dependencies'
DgeniDocs = require '../dgeni-docs'

module.exports = new Package('Angular', [PraxisClientGenerator, JS, Lodash, Dependencies, DgeniDocs])
  .processor 'renderCode', require './render_code.coffee'
  .processor 'moduleCreator', require './module_creator.coffee'
  .factory 'paramsGenerator', require './params_generator.coffee'
  .factory 'payloadGenerator', require './payload_generator.coffee'
  .factory 'urlAndHeadersGenerator', require './url_and_headers_generator.coffee'
  .factory 'validation', require './validation.coffee'
