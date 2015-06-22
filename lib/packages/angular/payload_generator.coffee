_ = require 'lodash-fp'
module.exports = (o) ->
  ({payload, urls}) ->
    processAttribute = ([attrName, value]) ->
      o attrName, ->
        return '' if _.any (({path}) -> path.match(///:#{attrName}///)), urls
        code = ''
        if value.required
          code += o 'required', -> """
          if (data.#{attrName} == null) {
            throw new Error('Required field \\'#{attrName.trim()}\\' is missing from the passsed data object');
          } else {
          """
        else
          code += o 'optional', -> """
          if (data.#{attrName} != null) {
          """

        code += "payload.#{attrName} = data.#{attrName};"
        code + "}"

    process = _.flow _.pairs, _.map(processAttribute), (arr) -> "var payload = {};\n#{arr.join('\n')}"
    o 'payload', ->
      process payload.type.attributes if payload? and payload.type.attributes?
