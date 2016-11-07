_ = require 'lodash-fp'

module.exports = (dependencies, processSeparately, typeName, o, template, isCollection, globalConfig) ->

  shouldBeArrayResponse = (responses) ->
    valid = (val for key, val of responses when val.status < 400)
    valid.length is 1 and valid[0].media_type and isCollection(valid[0].media_type)

  processResource = (doc) ->
    action = template(__dirname + '/templates/action.jst', {shouldBeArrayResponse})
    renderer = template(__dirname + '/templates/module.jst', {action, actionDocs: ->})
    doc.rendered = o doc.name, ->
      #moduleDocs(doc) + "\n" +
      renderer(doc)
    doc.outputPath = "lib/#{_.snakeCase(globalConfig.moduleName)}/#{_.snakeCase(doc.name)}.rb"
    doc.type = 'ruby'
    doc

  processType = (doc) ->
    return []
    # return [] if doc.name.match(/Links$/)
    # injector = []
    # attributeRenderer = (data) ->
    #   o data.key, ->
    #     template(__dirname + '/templates/attribute.jst', {injector})(data)
    # renderer = template(__dirname + '/templates/type.jst', {injector, attributeRenderer})
    # doc.rendered = o doc.name, ->
    #   renderer(doc).replace '%INJECTOR%', o 'injected', ->
    #     _.without(typeName(doc.name), _.uniq(injector)).join(', ')
    # doc.outputPath = 'lib/types/' + _.snakeCase(typeName(doc.name)) + '.js'
    # doc.type = 'js'
    # doc

  $runAfter: ['readDocs']
  $runBefore: ['beautify']
  $process: processSeparately(processResource, processType)
