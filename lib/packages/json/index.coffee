
{Package} = require 'dgeni'

module.exports = new Package('JSON', [])
  .processor 'stringifyJSON', require './stringify_json.coffee'
