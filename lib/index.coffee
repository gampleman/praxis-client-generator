{Package} = require 'dgeni'

module.exports = new Package('PraxisClientGenerator')
  .factory 'globalConfig', -> {}
  .processor 'readDocs', require './read_docs.coffee'
  .processor 'writeCode', require './write_code.coffee'
