_ = require 'lodash-fp'

module.exports = (globalConfig, moduleDocs, dependencies, o, template, injector) ->

  dependencies.addDependency 'client-js', 'angular', version: '~1.3'

  # This will enable annotations in the build if using grunt. We use lazy DI here
  # so that we don't get an error if the user is using another build system.
  if grunt = injector.get('writeGruntfile')
    grunt.buildConfiguration.ngAnnotate ?=
      dist:
        options:
          singleQuotes: true
        files: [{
          src: 'dist/client.js',
          dest: 'dist/client.js'
        }]
    build = grunt.targets.build
    index = build.indexOf('concat:dist')
    build.splice(index + 1, 0, 'ngAnnotate:dist')
    dependencies.addDependency 'node-js-dev', 'grunt-ng-annotate', version: '^0.10.0'

  $runAfter: ['renderCode']
  $runBefore: ['beautify']
  $process: (docs) ->
    docs.push({
      outputPath: 'lib/main.js'
      type: 'js'
      rendered: o 'module', -> """
      #{moduleDocs()}
      angular.module('#{globalConfig.moduleName}', []);
      """ + if !globalConfig.disablePromiseWrapping then template(__dirname + '/templates/wrapPromise.jst', {globalConfig})() else ''
    })
    docs
