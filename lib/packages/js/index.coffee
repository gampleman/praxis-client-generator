# NB: This module doesn't actually do very much, except that it packages together
# code that any JS client might find useful.

{Package} = require 'dgeni'
_ = require 'lodash-fp'

module.exports = new Package('JS', [])
  .processor 'beautify', require './beautify.coffee'
  .factory 'stringify', require './stringify.coffee'
  .factory 'methodName', -> _.camelCase
  .factory 'attributeName', -> _.camelCase
  .factory 'typeName', -> (doc) -> _.capitalize(_.camelCase(_.last(doc.split('::')))) + 'Type'
  .factory 'mapHelper', ->
    (arr, fn) -> "#{arr}.map(#{fn})"
  .factory 'appendHelper', ->
    (a, b, expression = false) ->
      if expression
        """(function(a,b) {
          for(var i = 0, l = b.length; i < l; l++) {
            a.push(b[i]);
          }
        })(#{a}, #{b})"""
      else
        """for(var i = 0, l = #{b}.length; i < l; i++) {
          #{a}.push(#{b}[i]);
        }"""
  .factory 'inlineComment', -> (str) -> "/* #{str} */"
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
