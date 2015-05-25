_ = require 'lodash-fp'
module.exports = (override, globalConfig, inlineComment) ->
  currentPath = []
  findMatchingCode = (path) ->
    results = []
    if override.paths[path.join('.')] # most specific wins, fast code path
      return override.paths[path.join('.')]
    for key, code of override.paths
      segments = key.split(/\s*\.\s*/)
      i = 0; specificity = 0; match = true
      for el, k in segments
        if el == path[i] # match
          i += 1
        else if el == '*' # match
          specificity -= 1
          i += 1
        else if el == '**'
          matches = (j for j in [i..path.length] when path[j] is segments[k + 1])
          if matches.length > 0
            i = matches[0]
            specificity -= 2
          else
            match = false
            break
        else
          match = false
          break
      if match
        results.push([specificity, code])
    _.first(_.sortBy(_.first, results))

  (segment, fn) ->
    currentPath.push(segment)
    code = findMatchingCode(currentPath) or fn() or ''
    if globalConfig.debugOverrides
      code = inlineComment("Override: #{currentPath.join('.')}") + code + inlineComment("End Override: #{currentPath.join('.')}")
    currentPath.pop()
    return code
