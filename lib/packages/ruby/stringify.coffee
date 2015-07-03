# This code stringifies a structure in memory into parseable ruby
_ = require 'lodash-fp'
module.exports = ->
  name = /^[$A-Z_][0-9A-Z_$]*$/i
  stringifySimple = (v) -> JSON.stringify v, null, 2
  makeKey = (v) ->
    if name.test(v) then "#{v}:" else "#{JSON.stringify(v)} =>"
  stringify = (input) ->
    if _.isPlainObject input
      '{' + ("""#{makeKey(key)} #{stringify(val)}""" for key,val of input).join(',\n') + '}'
    else if _.isArray input
      '[' + _.map(stringify, input).join(', ') + ']'
    else if _.isFunction input
      throw 'Unsupported stringification of functions'
    else if _.isNull(input) || _.isUndefined(input)
      'nil'
    else
      stringifySimple input
