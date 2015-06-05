{kebabCase} = require 'lodash-fp'
module.exports = (dependencies, globalConfig, execLater, ignoredFiles) ->
  $runBefore: ['stringifyJSON']
  $process: (docs) ->
    return unless globalConfig.project
    deps = {}
    devDeps = {}
    for {identifier, version} in dependencies.dependencies('client-js')
      deps[identifier] = version || '^1.0.0'

    for {identifier, version} in dependencies.dependencies('client-js-dev')
      devDeps[identifier] = version || '^1.0.0'

    docs.push {
      type: 'json'
      outputPath: 'bower.json'
      contents:
        name: kebabCase(globalConfig.moduleName)
        version: globalConfig.version || '1.0.0'
        main: 'dist/client.min.js'
        private: yes
        dependencies: deps
        devDependencies: devDeps
    }

    ignoredFiles.push('bower_components')

    execLater 'bower install'

    docs
