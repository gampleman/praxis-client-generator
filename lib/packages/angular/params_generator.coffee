_ = require 'lodash-fp'

module.exports = ->
  ({params, urls}) ->
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
        code += "params.#{attrName} = data.#{attrName};"
      else
        code += "params.#{attrName} = data.#{attrName}.encodeJSON ? data.#{attrName}.encodeJSON() : data.#{attrName};"
      code + "delete data.#{attrName};\n}"

    process = _.flow _.pairs, _.map(processAttribute), (arr) -> "var params = {};\n#{arr.join('\n')}"
    process params.type.attributes if params?
