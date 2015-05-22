module.exports =  ->
  override = (path, code) ->
    override.paths[path] = code
  override.paths = {}
  return override
