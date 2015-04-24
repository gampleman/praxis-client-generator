/**
 * @ngdoc service
 * @name Patterns
 * @description
 * This service is responsible for comunicating with Patterns resource.
 * Patterns describe operations in usage, and can be applied to InstanceCombinations in Scenarios to model changes in the cost.
        A pattern can only be applied to an InstanceCombination once.
 */
angular.module('APIClient').provider('Patterns', function() {
  this.$get = function($http) {
    var api = {};
    /**
     * @ngdoc method
     * @name Patterns#create
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Create a new Pattern.
     * @example
     *
     *    Patterns.create({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.create = function(data) {
      var url = {
        path: '/api/patterns',
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
      if (data.name == null) {
        throw new Error('Required field \'name\' is missing from the passsed data object');
      } else {
        payload.name = data.name;
      }
      if (data.summary != null) {
        payload.summary = data.summary;
      }
      if (data.type == null) {
        throw new Error('Required field \'type\' is missing from the passsed data object');
      } else {
        payload.type = data.type;
      }
      if (data.value == null) {
        throw new Error('Required field \'value\' is missing from the passsed data object');
      } else {
        payload.value = data.value.encodeJSON ? data.value.encodeJSON() : data.value;
      }
      if (data.operation == null) {
        throw new Error('Required field \'operation\' is missing from the passsed data object');
      } else {
        payload.operation = data.operation;
      }
      if (data.years == null) {
        throw new Error('Required field \'years\' is missing from the passsed data object');
      } else {
        payload.years = data.years;
      }
      if (data.months == null) {
        throw new Error('Required field \'months\' is missing from the passsed data object');
      } else {
        payload.months = data.months;
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
     * @name Patterns#index
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * List all Patterns.
     * @example
     *
     *    Patterns.index({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.index = function(data) {
      var url = {
        path: '/api/patterns',
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
     * @name Patterns#show
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Show a specific Pattern.
     * @example
     *
     *    Patterns.show({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.show = function(data) {
      var url = {
        path: '/api/patterns/' + data.id + '',
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
     * @name Patterns#update
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Update the provided attributes of a Pattern.
     * @example
     *
     *    Patterns.update({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.update = function(data) {
      var url = {
        path: '/api/patterns/' + data.id + '',
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
      if (data.summary != null) {
        payload.summary = data.summary;
      }
      if (data.type != null) {
        payload.type = data.type;
      }
      if (data.value != null) {
        payload.value = data.value.encodeJSON ? data.value.encodeJSON() : data.value;
      }
      if (data.operation != null) {
        payload.operation = data.operation;
      }
      if (data.years != null) {
        payload.years = data.years;
      }
      if (data.months != null) {
        payload.months = data.months;
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
     * @name Patterns#destroy
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Delete a Pattern.
     * @example
     *
     *    Patterns.destroy({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.destroy = function(data) {
      var url = {
        path: '/api/patterns/' + data.id + '',
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
 * @name Patterns#createDefaults
 * @param {Object} data
 *    This represents the data needed to fullfill this request. It is an object
 *    with the following keys:
 *
 * @returns {Promise} A promise for the response object.
 * @description
 * Create the following commonly used default Patterns: Increase by 2% every month,
          Increase by 5% every month, Increase by 10% every month, Increase by 15% every month,
          Increase by 500% during Nov - Dec, Increase by 200% during Jan - Feb, Decrease by 2% every month,
          Decrease by 5% every month, Decrease by 10% every month, Decrease by 15% every month, Add 1 every month.
 * @example
 *
 *    Patterns.createDefaults({
 *
 *    }).then(function(result) {
 *
 *    });
 */
    api.createDefaults = function(data) {
      var url = {
        path: '/api/patterns/actions/create_defaults',
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
