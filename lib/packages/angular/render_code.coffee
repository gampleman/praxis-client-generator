_ = require 'lodash-fp'
template = require 'lodash.template'
module.exports = (globalConfig, paramsGenerator, urlAndHeadersGenerator, payloadGenerator, dependencies, renderModuleDocs, renderActionDocs, methodName) ->

  dependencies.addDependency 'client-js', 'angular', version: '~1.3'
  $runAfter: ['readDocs']
  $runBefore: ['beautify']
  $process: _.map (doc) ->
    renderer = template("""
    angular.module('<%= globalConfig.moduleName %>').provider('<%= name %>', function() {
      this.$get = function($http) {
        var api = {};
        <% _.each(function(action) {%>
          <%= renderActionDocs(action) %>
          api.<%= methodName(action.name) %> = function(data) {
            <%= urlAndHeadersGenerator(globalConfig.base_path, action) %>
            <%= paramsGenerator(action) %>
            <%= payloadGenerator(action) %>
            return $http({
              method: url.method,
              url: url.path,
              headers: headers,
              <% if (action.params) { %>params: params, <%}%>
              <% if (action.payload) { %>data: payload, <%}%>
            }).then(function(response) {
              return response.data;
            });
          };
        <% }, actions) %>
        return api;
      };
    });
    """, imports: {urlAndHeadersGenerator, paramsGenerator, payloadGenerator, globalConfig, methodName, _, renderActionDocs: _.partial(renderActionDocs, doc)})
    doc.rendered = renderModuleDocs(doc) + "\n" + renderer(doc)
    doc.outputPath = 'lib/' + _.snakeCase(doc.name) + '.js'
    doc.type = 'js'
    doc
