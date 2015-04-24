/**
 * @ngdoc service
 * @name InstanceUsagePeriods
 * @description
 * This service is responsible for comunicating with InstanceUsagePeriods resource.
 * Enables you to get usage period details from instances. An instance can have many usage periods, which can
        be caused by stop/start actions or changes to the instance type etc.. InstanceUsagePeriods are used internally to
        calculate aggregate InstanceMetrics.
 */
angular.module('APIClient').provider('InstanceUsagePeriods', function() {
  this.$get = function($http) {
    var api = {};
    /**
     * @ngdoc method
     * @name InstanceUsagePeriods#index
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Gets the instance usage periods of instances.
     * @example
     *
     *    InstanceUsagePeriods.index({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.index = function(data) {
      var url = {
        path: '/api/instance_usage_periods',
        method: 'GET'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.instance_key_filters == null) {
        throw new Error('Required field \'instance_key_filters\' is missing from the passsed data object');
      } else {
        params.instance_key_filters = data.instance_key_filters.encodeJSON ? data.instance_key_filters.encodeJSON() : data.instance_key_filters;
        delete data.instance_key_filters;
      }
      return $http({
        method: url.method,
        url: url.path,
        headers: headers,
        params: params,
      }).then(function(response) {
        return response.data;
      });
    };
    return api;
  };
});
