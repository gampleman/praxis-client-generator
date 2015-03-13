template = require 'lodash.template'
_ = require 'lodash-fp'
Promise = require 'promise'
readFile = Promise.denodeify(require('fs').readFile)
readJSON = (filename) -> console.log filename; readFile(filename, 'UTF-8').then(JSON.parse)

praxisDocsPath = '../resticle_examples/docs/api/1.0'
basePath = ''

urlGenerator = (basePath, {urls}) ->
  if urls.length is 1
    "var url = {
      path: '#{basePath}#{urls[0].path.replace(/:([\w_]+)/, "' + data.$1 + '")}',
      method: '#{urls[0].verb}'
    };"
  else # decide which url to use
    conditions = _.map ({path, verb}) ->
      getChecks = _.map((arg) -> "data.#{arg.substring(1)} != null")
      check = getChecks path.match(/:[\w_]+/g)
      {
        body: """ {
          url = {
            path: '#{basePath}#{path.replace(/:([\w_]+)/, "' + data.$1 + '")}',
            method: '#{verb}'
          };
        }
        """,
        checks: "if (#{check.join(' && ')})"
        arity: check.length
      }
    , urls

    process = _.flow _.sortBy('arity'), _.map(({checks, body, arity}) -> if arity > 0 then checks + body else body)

    """
    var url;
    #{process(conditions).reverse().join(' else ')}
    """

readJSON(praxisDocsPath + '/version_index.json').then ({info, resources}) ->
  basePath = info.base_path
  promises = for path, {friendly_name} of resources
    do (friendly_name) ->
      readJSON(praxisDocsPath + '/resources/' + path + '.json').then ({actions}) ->
        {name: friendly_name, actions, basePath}
  Promise.all promises
.then _.map  template("""
  .provider('<%= name %>', function() {
    this.$get = function($http) {
      var api = {};
      <% _.each(function(action) {%>
        api.<%= action.name %> = function(data) {
          <%= urlGenerator(basePath, action) %>
          $http({
            method: url.method,
            url: url.path,

          });
        };
      <% }, actions) %>
    };
  })
  """, imports: {urlGenerator, _})
.then ((out) -> console.log("angular.module('Client')#{out.join('')}")), (err) -> console.log err
