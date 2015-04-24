/**
 * @ngdoc service
 * @name ReservedInstancePurchases
 * @description
 * This service is responsible for comunicating with ReservedInstancePurchases resource.
 * ReservedInstancePurchases can be applied to InstanceCombinations in Scenarios to model changes in the cost. These are not actually purchased in the cloud and are only used for cost simulation purposes.
 */
angular.module('APIClient').provider('ReservedInstancePurchases', function() {
  this.$get = function($http) {
    var api = {};
    /**
     * @ngdoc method
     * @name ReservedInstancePurchases#create
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Create a new ReservedInstancePurchase. This is not actually purchased in the cloud and is only used for cost simulation purposes.
     * @example
     *
     *    ReservedInstancePurchases.create({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.create = function(data) {
      var url = {
        path: '/reserved_instance_purchases',
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
      if (data.instance_combination_id == null) {
        throw new Error('Required field \'instance_combination_id\' is missing from the passsed data object');
      } else {
        params.instance_combination_id = data.instance_combination_id;
        delete data.instance_combination_id;
      }
      if (data.view != null) {
        params.view = data.view;
        delete data.view;
      }
      var payload = {};
      if (data.offering_type == null) {
        throw new Error('Required field \'offering_type\' is missing from the passsed data object');
      } else {
        payload.offering_type = data.offering_type;
      }
      if (data.duration == null) {
        throw new Error('Required field \'duration\' is missing from the passsed data object');
      } else {
        payload.duration = data.duration;
      }
      if (data.quantity == null) {
        throw new Error('Required field \'quantity\' is missing from the passsed data object');
      } else {
        payload.quantity = data.quantity;
      }
      if (data.start_date == null) {
        throw new Error('Required field \'start_date\' is missing from the passsed data object');
      } else {
        payload.start_date = data.start_date.encodeJSON ? data.start_date.encodeJSON() : data.start_date;
      }
      if (data.auto_renew == null) {
        throw new Error('Required field \'auto_renew\' is missing from the passsed data object');
      } else {
        payload.auto_renew = data.auto_renew.encodeJSON ? data.auto_renew.encodeJSON() : data.auto_renew;
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
     * @name ReservedInstancePurchases#index
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * List all ReservedInstancePurchases for the InstanceCombination.
     * @example
     *
     *    ReservedInstancePurchases.index({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.index = function(data) {
      var url = {
        path: '/reserved_instance_purchases',
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
      if (data.instance_combination_id == null) {
        throw new Error('Required field \'instance_combination_id\' is missing from the passsed data object');
      } else {
        params.instance_combination_id = data.instance_combination_id;
        delete data.instance_combination_id;
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
     * @name ReservedInstancePurchases#show
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Show a specific ReservedInstancePurchase.
     * @example
     *
     *    ReservedInstancePurchases.show({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.show = function(data) {
      var url = {
        path: '/reserved_instance_purchases/' + data.id + '',
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
      if (data.instance_combination_id == null) {
        throw new Error('Required field \'instance_combination_id\' is missing from the passsed data object');
      } else {
        params.instance_combination_id = data.instance_combination_id;
        delete data.instance_combination_id;
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
     * @name ReservedInstancePurchases#update
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Update the provided attributes of a ReservedInstancePurchase.
     * @example
     *
     *    ReservedInstancePurchases.update({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.update = function(data) {
      var url = {
        path: '/reserved_instance_purchases/' + data.id + '',
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
      if (data.instance_combination_id == null) {
        throw new Error('Required field \'instance_combination_id\' is missing from the passsed data object');
      } else {
        params.instance_combination_id = data.instance_combination_id;
        delete data.instance_combination_id;
      }
      if (data.view != null) {
        params.view = data.view;
        delete data.view;
      }
      var payload = {};
      if (data.offering_type != null) {
        payload.offering_type = data.offering_type;
      }
      if (data.duration != null) {
        payload.duration = data.duration;
      }
      if (data.quantity != null) {
        payload.quantity = data.quantity;
      }
      if (data.start_date != null) {
        payload.start_date = data.start_date.encodeJSON ? data.start_date.encodeJSON() : data.start_date;
      }
      if (data.auto_renew != null) {
        payload.auto_renew = data.auto_renew.encodeJSON ? data.auto_renew.encodeJSON() : data.auto_renew;
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
     * @name ReservedInstancePurchases#destroy
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Delete a ReservedInstancePurchase. This is not actually deleted in the cloud and is only used for cost simulation purposes.
     * @example
     *
     *    ReservedInstancePurchases.destroy({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.destroy = function(data) {
      var url = {
        path: '/reserved_instance_purchases/' + data.id + '',
        method: 'DELETE'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var params = {};
      if (data.instance_combination_id == null) {
        throw new Error('Required field \'instance_combination_id\' is missing from the passsed data object');
      } else {
        params.instance_combination_id = data.instance_combination_id;
        delete data.instance_combination_id;
      }
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
    return api;
  };
});
