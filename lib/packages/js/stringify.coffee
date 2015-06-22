# This code stringifies a structure in memory into parseable js
_ = require 'lodash-fp'
module.exports = ->
  reserved = 'instanceof typeof break do new var case else return void catch finally continue for switch while this with debugger function throw default if try delete in'.split(' ')
  name = /^[$A-Z_][0-9A-Z_$]*$/i
  stringifySimple = (v) -> JSON.stringify v, null, 2
  stringifyName = (v) ->
    if v not in reserved and name.test(v) then v else JSON.stringify(v)
  stringify = (input) ->
    if _.isPlainObject input
      '{' + ("""#{stringifyName(key)}: #{stringify(val)}""" for key,val of input).join(',\n') + '}'
    else if _.isArray input
      '[' + _.map(stringify, input).join(', ') + ']'
    else if _.isFunction input
      input.toString()
    else
      stringifySimple input
