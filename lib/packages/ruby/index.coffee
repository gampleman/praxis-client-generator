# NB: This module doesn't actually do very much, except that it packages together
# code that any Ruby client might find useful.
_ = require 'lodash-fp'
{Package} = require 'dgeni'

module.exports = new Package('Ruby', [])
  .processor 'beautify', require './beautify.coffee'
  .factory 'stringify', require './stringify.coffee'
  .factory 'methodName', -> _.snakeCase
  .factory 'attributeName', -> _.snakeCase
  .factory 'typeName', -> (doc) -> _.capitalize(_.camelCase(_.last(doc.split('::')))) + 'Type'
  .factory 'inlineComment', -> (str) -> "\n# #{str}\n"
  .factory 'typeConverter', (typeName) ->
    (type) ->
      switch type.name
        when 'DateTime'
          'Date'
        when 'Collection'
          'Array'
        when 'Integer', 'Float'
          'Number'
        when 'Struct'
          'Object'
        else
          if type.name.match(/::/)
            typeName type.name
          else
            type.name
