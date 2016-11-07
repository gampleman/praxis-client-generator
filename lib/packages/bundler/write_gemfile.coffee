_ = require 'lodash-fp'

module.exports = (dependencies, globalConfig, execLater) ->
  $runAfter: ['renderCode']
  $runBefore: ['writeCode']
  $process: (docs) ->
    return unless globalConfig.project

    author =
      name: 'changeme'
      email: 'changeme'
    description = 'changeme'
    summary = description
    homepage = 'https://github.com/gampleman/praxis-client-generator'

    deps = []
    for {identifier, version} in dependencies.dependencies('gem-ruby')
      deps.push("gem.add_dependency '#{identifier}'")

    for {identifier, version} in dependencies.dependencies('gem-ruby-dev')
      deps.push("gem.add_development_dependency '#{identifier}'")

    docs.push {
      type: 'ruby'
      outputPath: 'Gemfile'
      rendered: """
      source 'https://rubygems.org'

      gemspec
      """
    }

    path = _.snakeCase(globalConfig.moduleName)

    docs.push {
      type: 'ruby'
      outputPath: globalConfig.moduleName + '.gemspec'
      rendered: """
      # -*- encoding: utf-8 -*-
      require File.expand_path('../lib/#{path}/version', __FILE__)

      Gem::Specification.new do |gem|
        gem.authors       = ["#{author.name}"]
        gem.email         = ["#{author.email}"]
        gem.description   = %q{#{description}}
        gem.summary       = %q{#{summary}}
        gem.homepage      = "#{homepage}" # changeme

        gem.files         = `git ls-files`.split($\\)
        gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
        gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
        gem.name          = "#{path}"
        gem.require_paths = ["lib"]
        gem.version       = #{globalConfig.moduleName}::VERSION
        gem.license       = 'MIT'

        #{deps.join('\n')}
      end
      """
    }

    execLater 'bundle install'

    docs
