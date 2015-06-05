Promise = require 'promise'
{exec} = require 'child_process'

module.exports = ->
  Promise.denodeify(exec)
