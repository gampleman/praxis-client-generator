_ = require 'lodash-fp'

module.exports = (globalConfig, dependencies, o, template, injector) ->

  dependencies.addDependency 'gem-ruby', 'restclient', version: '~> 2'

  $runAfter: ['renderCode']
  $runBefore: ['beautify']
  $process: (docs) ->
    requires = for doc in docs when doc.type is 'ruby'
      "require File.dirname(__FILE__) + '/#{doc.outputPath.replace(/^lib\//, '')}'"
    docs.push({
      outputPath: "lib/#{_.snakeCase(globalConfig.moduleName)}/version.rb"
      type: 'ruby'
      rendered: o 'version', -> """
      module #{globalConfig.moduleName}
        VERSION = '1.0.0'
      end

      """
    })
    docs.push({
      outputPath: "lib/#{_.snakeCase(globalConfig.moduleName)}.rb"
      type: 'ruby'
      rendered: o 'main', ->
        out = """
        require 'restclient'

        #{requires.join('\n')}
        module #{globalConfig.moduleName}

        """
        out += o 'authencitate', ->
          """def self.authenticate
            # TODO: Implement this
          end

          """
        out += """
        end

        """
    })
    docs
