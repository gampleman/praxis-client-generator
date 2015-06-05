_ = require 'lodash-fp'
Promise = require 'promise'
mkdirp = Promise.denodeify require('mkdirp')
path = require 'path'
write = Promise.denodeify(require('fs').writeFile)

writeFile = (filename, content) ->
  mkdirp(path.dirname(filename)).then ->
    write(filename, content, 'UTF-8')

module.exports = (globalConfig) ->
  $runAfter: ['readDocs']
  $process: (docs) ->
    mkdirp(globalConfig.outputPath).then ->
      Promise.all _.map (doc) ->
        writeFile globalConfig.outputPath + '/' + doc.outputPath, doc.rendered
      , docs
