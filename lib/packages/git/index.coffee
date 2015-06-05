{Package} = require 'dgeni'
Commands = require '../commands'
SCM = require '../scm'

module.exports = new Package('Git', [Commands, SCM])
  .processor 'writeGitignore', (ignoredFiles, globalConfig) ->
    $runBefore: ['writeCode']
    $runAfter: ['renderCode']
    $process: (docs) ->
      return unless globalConfig.project
      docs.push
        type: 'gitignore'
        outputPath: '.gitignore'
        contents: ignoredFiles
        rendered: ignoredFiles.join('\n')
      docs
