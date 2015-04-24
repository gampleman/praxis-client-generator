/**
 * @ngdoc service
 * @name InstanceCombinations
 * @description
 * This service is responsible for comunicating with InstanceCombinations resource.
 * InstanceCombinations represent instances that make-up a Scenario.
        Note that, when making create and update calls, a Pattern can only be applied to an InstanceCombination once.
 */
angular.module('APIClient').provider('InstanceCombinations', function() {
  this.$get = function($http) {
    var api = {};
    /**
     * @ngdoc method
     * @name InstanceCombinations#create
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Create a new InstanceCombination.
     * @example
     *
     *    InstanceCombinations.create({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.create = function(data) {
      var url = {
        path: '/instance_combinations',
        method: 'POST'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.scenario_id == null) {
        throw new Error('Required field \'scenario_id\' is missing from the passsed data object');
      } else {
        params.scenario_id = data.scenario_id;
        delete data.scenario_id;
      }
      if (data.view != null) {
        params.view = data.view;
        delete data.view;
      }
      var payload = {};
      if (data.quantity == null) {
        throw new Error('Required field \'quantity\' is missing from the passsed data object');
      } else {
        payload.quantity = data.quantity;
      }
      if (data.cloud_vendor_name == null) {
        throw new Error('Required field \'cloud_vendor_name\' is missing from the passsed data object');
      } else {
        payload.cloud_vendor_name = data.cloud_vendor_name;
      }
      if (data.cloud_name == null) {
        throw new Error('Required field \'cloud_name\' is missing from the passsed data object');
      } else {
        payload.cloud_name = data.cloud_name;
      }
      if (data.datacenter_name != null) {
        payload.datacenter_name = data.datacenter_name;
      }
      if (data.instance_type_name == null) {
        throw new Error('Required field \'instance_type_name\' is missing from the passsed data object');
      } else {
        payload.instance_type_name = data.instance_type_name;
      }
      if (data.platform == null) {
        throw new Error('Required field \'platform\' is missing from the passsed data object');
      } else {
        payload.platform = data.platform;
      }
      if (data.monthly_usage_option == null) {
        throw new Error('Required field \'monthly_usage_option\' is missing from the passsed data object');
      } else {
        payload.monthly_usage_option = data.monthly_usage_option;
      }
      if (data.monthly_usage_hours != null) {
        payload.monthly_usage_hours = data.monthly_usage_hours;
      }
      if (data.patterns != null) {
        payload.patterns = data.patterns.encodeJSON ? data.patterns.encodeJSON() : data.patterns;
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
     * @name InstanceCombinations#show
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Show a specific InstanceCombination.
     * @example
     *
     *    InstanceCombinations.show({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.show = function(data) {
      var url = {
        path: '/instance_combinations/' + data.id + '',
        method: 'GET'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.scenario_id == null) {
        throw new Error('Required field \'scenario_id\' is missing from the passsed data object');
      } else {
        params.scenario_id = data.scenario_id;
        delete data.scenario_id;
      }
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
     * @name InstanceCombinations#update
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Update the provided attributes of an InstanceCombination.
     * @example
     *
     *    InstanceCombinations.update({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.update = function(data) {
      var url = {
        path: '/instance_combinations/' + data.id + '',
        method: 'PATCH'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.scenario_id == null) {
        throw new Error('Required field \'scenario_id\' is missing from the passsed data object');
      } else {
        params.scenario_id = data.scenario_id;
        delete data.scenario_id;
      }
      if (data.view != null) {
        params.view = data.view;
        delete data.view;
      }
      var payload = {};
      if (data.quantity != null) {
        payload.quantity = data.quantity;
      }
      if (data.cloud_vendor_name != null) {
        payload.cloud_vendor_name = data.cloud_vendor_name;
      }
      if (data.cloud_name != null) {
        payload.cloud_name = data.cloud_name;
      }
      if (data.datacenter_name != null) {
        payload.datacenter_name = data.datacenter_name;
      }
      if (data.instance_type_name != null) {
        payload.instance_type_name = data.instance_type_name;
      }
      if (data.platform != null) {
        payload.platform = data.platform;
      }
      if (data.monthly_usage_option != null) {
        payload.monthly_usage_option = data.monthly_usage_option;
      }
      if (data.monthly_usage_hours != null) {
        payload.monthly_usage_hours = data.monthly_usage_hours;
      }
      if (data.patterns != null) {
        payload.patterns = data.patterns.encodeJSON ? data.patterns.encodeJSON() : data.patterns;
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
     * @name InstanceCombinations#destroy
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Delete an InstanceCombination.
     * @example
     *
     *    InstanceCombinations.destroy({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.destroy = function(data) {
      var url = {
        path: '/instance_combinations/' + data.id + '',
        method: 'DELETE'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.scenario_id == null) {
        throw new Error('Required field \'scenario_id\' is missing from the passsed data object');
      } else {
        params.scenario_id = data.scenario_id;
        delete data.scenario_id;
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
     * @name InstanceCombinations#reservedInstancePrices
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Returns pricing details for the various reserved instances that can be purchased for this InstanceCombination.
     * @example
     *
     *    InstanceCombinations.reservedInstancePrices({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.reservedInstancePrices = function(data) {
      var url = {
        path: '/instance_combinations/' + data.id + '/actions/reserved_instance_prices',
        method: 'GET'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.scenario_id == null) {
        throw new Error('Required field \'scenario_id\' is missing from the passsed data object');
      } else {
        params.scenario_id = data.scenario_id;
        delete data.scenario_id;
      }
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
