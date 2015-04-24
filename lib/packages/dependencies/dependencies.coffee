_ = require 'lodash-fp'
module.exports = () ->
  trackedDependencies = {}
  {
    addDependency: (type, identifier, options = {}) ->
      trackedDependencies[type] ?= {}
      options.identifier = identifier
      trackedDependencies[type][identifier + ' ' + options.version] = options
      options
    dependencies: (type) ->
      _.values(trackedDependencies[type] || {})
  }
