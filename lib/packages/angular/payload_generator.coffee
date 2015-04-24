_ = require 'lodash-fp'
module.exports = ->
  ({payload, urls}) ->
    processAttribute = ([attrName, value]) ->
      return '' if _.any (({path}) -> path.match(///:#{attrName}///)), urls
      code = ''
      if value.required
        code += """
        if (data.#{attrName} == null) {
          throw new Error('Required field \\'#{attrName.trim()}\\' is missing from the passsed data object');
        } else {
        """
      else
        code += """
        if (data.#{attrName} != null) {
        """
      if value.type.name == 'String' || value.type.name == 'Symbol' || value.type.name == 'Integer'
        code += "payload.#{attrName} = data.#{attrName};"
      else
        code += "payload.#{attrName} = data.#{attrName}.encodeJSON ? data.#{attrName}.encodeJSON() : data.#{attrName};"
      code + "}"

    process = _.flow _.pairs, _.map(processAttribute), (arr) -> "var payload = {};\n#{arr.join('\n')}"
    process payload.type.attributes if payload? and payload.type.attributes?