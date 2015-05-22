_ = require 'lodash-fp'
module.exports = (globalConfig, o) ->
  (basePath, {urls}) ->
    if globalConfig.headers
      customHeaders = ',' + ("'#{header}': #{value}" for header, value of globalConfig.headers).join(',')
    if urls.length is 1
      "var url = {
        path: '#{basePath}#{urls[0].path.replace(/:([\w_]+)/, "' + data.$1 + '")}',
        method: '#{urls[0].verb}'
      };
      var headers = {
        'X-API-VERSION': '#{urls[0].version}'#{customHeaders}
      };"
    else # decide which url to use
      conditions = _.map ({path, verb, version}) ->
        getChecks = _.map((arg) -> "data.#{arg.substring(1)} != null")
        check = getChecks path.match(/:[\w_]+/g)
        {
          body: """ {
            url = {
              path: '#{basePath}#{path.replace(/:([\w_]+)/, "' + data.$1 + '")}',
              method: '#{verb}'
            };
            headers['X-API-VERSION'] = '#{version}';
          }
          """,
          checks: "if (#{check.join(' && ')})"
          arity: check.length
        }
      , urls

      process = _.flow _.sortBy('arity'), _.map(({checks, body, arity}) -> if arity > 0 then checks + body else body)

      o('headers', -> """
      var headers = {#{customHeaders}};
      """) + o('url', -> """
      var url;
      #{process(conditions).reverse().join(' else ')}
      """)
