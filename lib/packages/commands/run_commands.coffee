Promise = require 'promise'

module.exports = (exec, execLater, globalConfig, log) ->
  $runAfter: ['writeCode']
  $process: ->
    promises = for {command, options} in execLater.commands
      options.cwd ?= globalConfig.outputPath
      if Array.isArray command
        log.info "Executing #{command.join('\n')} in sequence"
        command.reduce (promise, com) ->
          promise.then -> exec(com, options)
        , Promise.resolve(undefined)
      else
        log.info "Executing #{command}"
        exec command, options
    Promise.all promises
