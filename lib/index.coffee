{Package} = require 'dgeni'
_ = require 'lodash-fp'

module.exports = new Package('PraxisClientGenerator')
  .factory 'globalConfig', -> {}
  .processor 'readDocs', require './read_docs.coffee'
  .processor 'writeCode', require './write_code.coffee'
  .factory 'filterResources', -> _.filter kind: 'resource'
  .factory 'filterSchemas', -> _.filter kind: 'schema'
  .factory 'processSeparately', ->
    (resourceFn, schemaFn) ->
      _.flow _.groupBy('kind'), _.pairs, ((data) -> console.log(data); data),
             _.map(([type, docs]) ->
               if type is 'resource'
                 _.map resourceFn, docs
               else
                 _.map schemaFn, docs
             ), _.flatten
