module.exports = (dependencies) ->
  dependencies.addDependency 'node-js', 'jasmine', version: '~2.0.0'
  specs = {}
  getObjectAtPath = (paths) ->
    currentObj = specs
    for segment in path
      currentObj[segment] ?= {}
      currentObj = currentObj[segment]
    currentObj

  return {
    it: (path..., name, code) ->
      getObjectAtPath(path)[name] = code

    beforeEach: (path..., code) ->
      obj = getObjectAtPath(path)
      obj.beforeEach ?= []
      obj.beforeEach.push(code)

    afterEach: (path..., code) ->
      obj = getObjectAtPath(path)
      obj.afterEach ?= []
      obj.afterEach.push(code)

    specs: -> specs
  }
