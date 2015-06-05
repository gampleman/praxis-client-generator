_ = require 'lodash-fp'

module.exports = (globalConfig, moduleDocs, dependencies, o, template) ->

  dependencies.addDependency 'client-js', 'angular', version: '~1.3'

  $runAfter: ['renderCode']
  $runBefore: ['beautify']
  $process: (docs) ->
    docs.push({
      outputPath: 'lib/main.js'
      type: 'js'
      rendered: o 'module', -> """
      #{moduleDocs()}
      angular.module('#{globalConfig.moduleName}', []);
      """ + if !globalConfig.disablePromiseWrapping then template(__dirname + '/templates/wrapPromise.jst', {globalConfig}) else ''
    })
    docs
