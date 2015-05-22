module.exports = (dependencies, globalConfig) ->
  $runAfter: ['renderCode']
  $runBefore: ['writeCode']
  $process: (docs) ->
    return unless globalConfig.project
    deps = []
    devDeps = []
    for {identifier, version} in dependencies.dependencies('gem-ruby')
      deps.push("gem '#{identifier}', '#{version || '~> 1.0'}'")

    for {identifier, version} in dependencies.dependencies('gem-ruby-dev')
      devDeps.push("gem '#{identifier}', '#{version || '~> 1.0'}'")

    docs.push {
      type: 'ruby'
      outputPath: 'Gemfile'
      rendered: """
      source 'https://rubygems.org'

      #{deps.join('\n')}

      group :development do
        #{devDeps.join('\n')}
      end
      """
    }

    docs
