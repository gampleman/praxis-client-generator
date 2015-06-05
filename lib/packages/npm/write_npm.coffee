{kebabCase} = require 'lodash-fp'
module.exports = (dependencies, globalConfig, execLater, ignoredFiles) ->
  $runBefore: ['stringifyJSON']
  $process: (docs) ->
    return unless globalConfig.project
    deps = {}
    devDeps = {}
    for {identifier, version} in dependencies.dependencies('node-js')
      deps[identifier] = version || '^1.0.0'

    for {identifier, version} in dependencies.dependencies('node-js-dev')
      devDeps[identifier] = version || '^1.0.0'

    docs.push {
      type: 'json'
      outputPath: 'package.json'
      contents:
        name: kebabCase(globalConfig.moduleName)
        version: globalConfig.version || '1.0.0'
        private: yes
        dependencies: deps
        devDependencies: devDeps
    }
    ignoredFiles.push('node_modules')
    execLater 'npm install'
    docs
