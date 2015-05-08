_ = require 'lodash-fp'
template = require 'lodash.template'
module.exports = (globalConfig, paramsGenerator, urlAndHeadersGenerator, payloadGenerator, dependencies, moduleDocs, actionDocs, propertyDocs, methodName, processSeparately, typeName, attributeName, mapHelper) ->

  dependencies.addDependency 'client-js', 'angular', version: '~1.3'

  processResource = (doc) ->
    injector = ['$http']
    renderer = template("""
    angular.module('<%= globalConfig.moduleName %>').provider('<%= name %>', function() {
      this.$get = function(%INJECTOR%) {
        var api = {};
        <% _.each(function(action) {%>
          <%= actionDocs(action) %>
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
              <% _.each(function(response, key) { %>
                <% if (response.status < 400) {%>
                  if (response.code === <%= response.status %>) {
                    <% if (response.media_type && response.media_type.name) {%>
                      <% injector.push(typeName(response.media_type.name)) %>
                      return new <%=typeName(response.media_type.name)%>(response.data);
                    <% } else {%>
                      return response.data;
                    <% } %>
                  }
                <% } %>
              <% }, action.responses) %>
            });
          };
        <% }, actions) %>
        return api;
      };
    });
    """, imports: {urlAndHeadersGenerator, typeName, paramsGenerator, payloadGenerator, globalConfig, methodName, _, injector, actionDocs: _.partial(actionDocs, doc)})
    doc.rendered = moduleDocs(doc) + "\n" + renderer(doc).replace('%INJECTOR%', _.uniq(injector).join(', '))
    doc.outputPath = 'lib/services/' + _.snakeCase(doc.name) + '.js'
    doc.type = 'js'
    doc

  processType = (doc) ->
    return [] if doc.name.match(/Links$/)
    injector = []
    renderer = template("""
    angular.module('<%= globalConfig.moduleName %>').provider('<%= typeName(name) %>', function() {
      this.$get = function(%INJECTOR%) {
        function <%= typeName(name) %>(data) {
          <% _.each(function(attribute, key) { %>
            <% if (key === 'links' && attribute.type.name.match(/Links$/)) {%>
              <% _.each(function(desc, link) { %>
                <% if(!attributes[link]) {%>
                  if (data.links && data.links['<%= link %>'] && data.links['<%= link %>'].url) {
                    this.<%= methodName(link) %> = function() {
                      <% injector.push('$http') %>
                      return $http.get(data.links['<%= link %>'].url).then(function(response) {
                        <% var theType = typeName(desc.options.reference); injector.push(theType) %>
                        return new <%= theType %>(response.data);
                      });
                    };
                  }
                <% } %>
              <%}, attribute.type.attributes) %>
            <% } else { %>
              <%= propertyDocs(key, attribute) %>
              <% if (attribute.type.name.match(/::/)) { %>
                // Currently the existence of this type is assumed
                <% injector.push(typeName(attribute.type.name)) %>
                this.<%= attributeName(key) %> = new <%= typeName(attribute.type.name)%>(data['<%=key%>']);
              <% } else if (attribute.type.name === 'Collection' && attribute.type.member_attribute.type.name.match(/::/)) { %>
                // Currently the existence of this type is assumed
                <% injector.push(typeName(attribute.type.member_attribute.type.name)) %>
                this.<%= attributeName(key) %> = <%= mapHelper("(data['" + key+ "'] || [])", "function(element) {" +
                "  return new " +
                typeName(attribute.type.member_attribute.type.name) +
                "(element);" +
                "}")%>;
              <% } else { %>
                this.<%= attributeName(key) %> = data['<%=key%>'];
              <% } %>
            <% } %>
          <% }, attributes) %>
        }
      };
    });
    """, imports: {typeName, methodName, globalConfig, attributeName, mapHelper, injector, _, propertyDocs: _.partial(propertyDocs, doc)})
    doc.rendered = renderer(doc).replace('%INJECTOR%', _.without(typeName(doc.name), _.uniq(injector)).join(', '))
    doc.outputPath = 'lib/types/' + _.snakeCase(doc.name) + '.js'
    doc.type = 'js'
    doc


  $runAfter: ['readDocs']
  $runBefore: ['beautify']
  $process: processSeparately(processResource, processType)
