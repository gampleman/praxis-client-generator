# This module provides code generators for helpers from the lodash library

{Package} = require 'dgeni'
_ = require 'lodash-fp'
Dependencies = require '../dependencies'

box = new Package('Lodash', [Dependencies])

for method in _
  box.factory "#{method}Helper", (dependencies) ->
    dependencies.addDependency 'client-js', 'lodash', version: '~3.7.0'
    (args...) ->
      "_.#{method}(#{args.join(', ')})"

module.exports = box
