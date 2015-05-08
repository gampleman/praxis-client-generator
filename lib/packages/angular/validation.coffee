module.exports = ->
  (attrname, value, usable) ->
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
    
