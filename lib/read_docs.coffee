_ = require 'lodash-fp'
Promise = require 'promise'
readFile = Promise.denodeify(require('fs').readFile)
readJSON = (filename) -> readFile(filename, 'UTF-8').then(JSON.parse)

module.exports = (globalConfig) ->
  $process: ->
    readJSON(globalConfig.praxisDocsPath + '/version_index.json').then ({info, resources}) ->
      _.merge(info, globalConfig)
      promises = for path, {friendly_name} of resources
        do (friendly_name) ->
          readJSON(globalConfig.praxisDocsPath + '/resources/' + path + '.json').then ({actions, description}) ->
            {name: friendly_name, actions, description}
      Promise.all promises
