# This module is used for rendering jasmine specs
{Package} = require 'dgeni'

module.exports = new Package('DgeniDocs', [])
  .factory 'actionDocs', require './action_docs.coffee'
  .factory 'moduleDocs', require './module_docs.coffee'
  .factory 'propertyDocs', require './property_docs.coffee'
  .factory 'typeDocs', require './type_docs.coffee'
