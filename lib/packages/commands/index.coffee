{Package} = require 'dgeni'

module.exports = new Package('Commands', [])
  .processor 'runCommands', require './run_commands.coffee'
  .factory 'execLater', require './exec_later.coffee'
  .factory 'exec', require './exec.coffee'
