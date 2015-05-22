{readFileSync} = require 'fs'
template = require 'lodash.template'
_ = require 'lodash-fp'

module.exports = (overridable, injector) ->
  (path, deps = {}) ->
    deps._ = _
    file = readFileSync(path, 'utf8')
    if match = file.match(/^@inject\s+([\w,\s]+?)\n/)
      file = file.replace(/^.+?\n/, '')
      injectables = match[1].split(/\s*,\s*/)
      deps[injectable] = injector.get(injectable) for injectable in injectables
    if pathMatch = path.match(/\w+(?=\.jst$)/)
      (arg, otherDeps) ->
        overridable pathMatch[0], ->
          template(file, imports: _.merge(otherDeps, deps))(arg)
    else
      (arg, otherDeps) -> template(file, imports: _.merge(otherDeps, deps))(arg)
