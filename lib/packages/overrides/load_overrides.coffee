_ = require 'lodash-fp'
Promise = require 'promise'
fs = require 'fs'
readFile = Promise.denodeify(fs.readFile)
readDir = Promise.denodeify(fs.readdir)

module.exports = (globalConfig, override) ->
  $runBefore: ['readDocs']
  $process: ->
    dir = globalConfig.overridesDirectory || process.cwd() + '/overrides'
    readDir(dir).then (files) ->
      Promise.all (_.map (file) ->
        readFile(file, 'utf8').then (contents) ->
          path = file.match(/([^\/]+)\..+?$/)[1]
          override(path, contents)
          undefined
      , files)
    , (err) ->
      console.error "Skipping loadOverrides: #{err}"
