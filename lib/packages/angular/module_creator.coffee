_ = require 'lodash-fp'

module.exports = (globalConfig, moduleDocs, dependencies) ->

  dependencies.addDependency 'client-js', 'angular', version: '~1.3'

  $runAfter: ['renderCode']
  $runBefore: ['beautify']
  $process: (docs) ->
    docs.push({
      outputPath: 'lib/main.js'
      type: 'js'
      rendered: """
      #{moduleDocs()}
      angular.module('#{globalConfig.moduleName}', []);
      """
    })
    docs
