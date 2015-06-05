_ = require 'lodash-fp'

module.exports = (dependencies, moduleDocs, actionDocs, processSeparately, typeName, o, template, isCollection) ->

  dependencies.addDependency 'client-js', 'angular', version: '~1.3'

  shouldBeArrayResponse = (responses) ->
    valid = (val for key, val of responses when val.status < 400)
    valid.length is 1 and valid[0].media_type and isCollection(valid[0].media_type)

  processResource = (doc) ->
    injector = ['$http']
    responseHandler = template(__dirname + '/templates/responseHandler.jst', {injector})
    action = template(__dirname + '/templates/action.jst', {injector, responseHandler, shouldBeArrayResponse})
    renderer = template(__dirname + '/templates/provider.jst', {injector, action, actionDocs: _.partial(actionDocs, doc)})
    doc.rendered = o doc.name, ->
      moduleDocs(doc) + "\n" + renderer(doc).replace '%INJECTOR%', o 'injected', ->
        _.uniq(injector).join(', ')
    doc.outputPath = 'lib/services/' + _.snakeCase(doc.name) + '.js'
    doc.type = 'js'
    doc

  processType = (doc) ->
    return [] if doc.name.match(/Links$/)
    injector = []
    attributeRenderer = (data) ->
      o data.key, ->
        template(__dirname + '/templates/attribute.jst', {injector})(data)
    renderer = template(__dirname + '/templates/type.jst', {injector, attributeRenderer})
    doc.rendered = o doc.name, ->
      renderer(doc).replace '%INJECTOR%', o 'injected', ->
        _.without(typeName(doc.name), _.uniq(injector)).join(', ')
    doc.outputPath = 'lib/types/' + _.snakeCase(doc.name) + '.js'
    doc.type = 'js'
    doc

  $runAfter: ['readDocs']
  $runBefore: ['beautify']
  $process: processSeparately(processResource, processType)
