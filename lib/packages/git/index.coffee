{Package} = require 'dgeni'
Commands = require '../commands'
SCM = require '../scm'

module.exports = new Package('Git', [Commands, SCM])
  .processor 'writeGitignore', (ignoredFiles) ->
    $runBefore: ['writeCode']
    $process: (docs) ->
      docs.push
        type: 'gitignore'
        outputPath: '.gitignore'
        contents: ignoredFiles
        rendered: ignoredFiles.join('\n')
      docs
