# This module is used for rendering jasmine specs
{Package} = require 'dgeni'

module.exports = new Package('DgeniDocs', [])
  .factory 'renderActionDocs', require './render_action_docs.coffee'
  .factory 'renderModuleDocs', require './render_module_docs.coffee'
