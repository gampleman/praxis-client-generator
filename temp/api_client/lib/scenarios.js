/**
 * @ngdoc service
 * @name Scenarios
 * @description
 * This service is responsible for comunicating with Scenarios resource.
 * Scenarios can be used to model changes in cloud usage to forecast costs over a 3-year period.
        Use the forecast action to generate the results after you create a Scenario and add your InstanceCombinations,
        ReservedInstancePurchases and Patterns.
 */
angular.module('APIClient').provider('Scenarios', function() {
  this.$get = function($http) {
    var api = {};
    /**
     * @ngdoc method
     * @name Scenarios#create
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Create a new Scenario.
     * @example
     *
     *    Scenarios.create({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.create = function(data) {
      var url = {
        path: '/api/scenarios',
        method: 'POST'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.view != null) {
        params.view = data.view;
        delete data.view;
      }
      var payload = {};
      if (data.name != null) {
        payload.name = data.name;
      }
      if (data.is_persisted != null) {
        payload.is_persisted = data.is_persisted.encodeJSON ? data.is_persisted.encodeJSON() : data.is_persisted;
      }
      if (data.snapshot_timestamp == null) {
        throw new Error('Required field \'snapshot_timestamp\' is missing from the passsed data object');
      } else {
        payload.snapshot_timestamp = data.snapshot_timestamp.encodeJSON ? data.snapshot_timestamp.encodeJSON() : data.snapshot_timestamp;
      }
      if (data.filters != null) {
        payload.filters = data.filters.encodeJSON ? data.filters.encodeJSON() : data.filters;
      }
      if (data.private_cloud_instance_count != null) {
        payload.private_cloud_instance_count = data.private_cloud_instance_count;
      }
      if (data.is_blank != null) {
        payload.is_blank = data.is_blank.encodeJSON ? data.is_blank.encodeJSON() : data.is_blank;
      }
      return $http({
        method: url.method,
        url: url.path,
        headers: headers,
        params: params,
        data: payload,
      }).then(function(response) {
        return response.data;
      });
    };
    /**
     * @ngdoc method
     * @name Scenarios#index
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * List all Scenarios.
     * @example
     *
     *    Scenarios.index({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.index = function(data) {
      var url = {
        path: '/api/scenarios',
        method: 'GET'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.view != null) {
        params.view = data.view;
        delete data.view;
      }
      if (data.include_non_persisted != null) {
        params.include_non_persisted = data.include_non_persisted.encodeJSON ? data.include_non_persisted.encodeJSON() : data.include_non_persisted;
        delete data.include_non_persisted;
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
    /**
     * @ngdoc method
     * @name Scenarios#show
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Show a specific Scenario.
     * @example
     *
     *    Scenarios.show({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.show = function(data) {
      var url = {
        path: '/api/scenarios/' + data.id + '',
        method: 'GET'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.view != null) {
        params.view = data.view;
        delete data.view;
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
    /**
     * @ngdoc method
     * @name Scenarios#update
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Update the provided attributes of a Scenario.
     * @example
     *
     *    Scenarios.update({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.update = function(data) {
      var url = {
        path: '/api/scenarios/' + data.id + '',
        method: 'PATCH'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.view != null) {
        params.view = data.view;
        delete data.view;
      }
      var payload = {};
      if (data.name != null) {
        payload.name = data.name;
      }
      if (data.is_persisted != null) {
        payload.is_persisted = data.is_persisted.encodeJSON ? data.is_persisted.encodeJSON() : data.is_persisted;
      }
      if (data.snapshot_timestamp != null) {
        payload.snapshot_timestamp = data.snapshot_timestamp.encodeJSON ? data.snapshot_timestamp.encodeJSON() : data.snapshot_timestamp;
      }
      if (data.private_cloud_instance_count != null) {
        payload.private_cloud_instance_count = data.private_cloud_instance_count;
      }
      return $http({
        method: url.method,
        url: url.path,
        headers: headers,
        params: params,
        data: payload,
      }).then(function(response) {
        return response.data;
      });
    };
    /**
     * @ngdoc method
     * @name Scenarios#destroy
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Delete a Scenario.
     * @example
     *
     *    Scenarios.destroy({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.destroy = function(data) {
      var url = {
        path: '/api/scenarios/' + data.id + '',
        method: 'DELETE'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      return $http({
        method: url.method,
        url: url.path,
        headers: headers,
        params: params,
      }).then(function(response) {
        return response.data;
      });
    };
    /**
 * @ngdoc method
 * @name Scenarios#forecast
 * @param {Object} data
 *    This represents the data needed to fullfill this request. It is an object
 *    with the following keys:
 *
 * @returns {Promise} A promise for the response object.
 * @description
 * Run a simulation to generate a 3-year forecast showing the `average_instance_count`, `instance_upfront_cost`,
           `instance_usage_cost` and `instance_recurring_cost` metrics. This call might get major changes so it's best to avoid using it currently.
           If there are missing prices for any of the InstanceCombinations then these metrics will be excluded from the results for that InstanceCombination.
 * @example
 *
 *    Scenarios.forecast({
 *
 *    }).then(function(result) {
 *
 *    });
 */
    api.forecast = function(data) {
      var url = {
        path: '/api/scenarios/' + data.id + '/actions/forecast',
        method: 'GET'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.view != null) {
        params.view = data.view;
        delete data.view;
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
