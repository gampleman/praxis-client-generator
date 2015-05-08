_ = require 'lodash-fp'
Promise = require 'promise'
readFile = Promise.denodeify(require('fs').readFile)
readJSON = (filename) -> readFile(filename, 'UTF-8').then(JSON.parse)

module.exports = (globalConfig) ->
  $process: ->
    readJSON(globalConfig.praxisDocsPath + '/version_index.json').then ({info, resources, schemas}) ->
      _.merge(info, globalConfig)
      resourcePromises = for path, {friendly_name} of resources
        do (friendly_name) ->
          readJSON(globalConfig.praxisDocsPath + '/resources/' + path + '.json').then ({actions, description}) ->
            {name: friendly_name, kind: 'resource', actions, description}
      schemaPromises = for path, {friendly_name} of schemas
        do (friendly_name) ->
          readJSON(globalConfig.praxisDocsPath + '/types/' + path + '.json').then (schema) ->
            _.merge {name: friendly_name, kind: 'schema'}, schema
      Promise.all resourcePromises.concat schemaPromises
