_ = require 'lodash-fp'

module.exports = (dependencies, moduleDocs, actionDocs, processSeparately, typeName, o, template) ->

  dependencies.addDependency 'client-js', 'angular', version: '~1.3'

  processResource = (doc) ->
    injector = ['$http']
    responseHandler = template(__dirname + '/templates/responseHandler.jst', {injector})
    action = template(__dirname + '/templates/action.jst', {injector, responseHandler})
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
    renderer = template(__dirname + '/templates/type.jst', {injector})
    doc.rendered = o doc.name, ->
      renderer(doc).replace '%INJECTOR%', o 'injected', ->
        _.without(typeName(doc.name), _.uniq(injector)).join(', ')
    doc.outputPath = 'lib/types/' + _.snakeCase(doc.name) + '.js'
    doc.type = 'js'
    doc


  $runAfter: ['readDocs']
  $runBefore: ['beautify']
  $process: processSeparately(processResource, processType)
