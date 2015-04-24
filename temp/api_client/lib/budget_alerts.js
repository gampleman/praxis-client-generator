/**
 * @ngdoc service
 * @name BudgetAlerts
 * @description
 * This service is responsible for comunicating with BudgetAlerts resource.
 * Enable you to set a monthly spend budget and be alerted via email when this is exceeded,
        based on either actual or forecasted spend. These emails include links to AnalysisSnapshots, which are
        generated automatically by us.
 */
angular.module('APIClient').provider('BudgetAlerts', function() {
  this.$get = function($http) {
    var api = {};
    /**
     * @ngdoc method
     * @name BudgetAlerts#create
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Create a new BudgetAlert.
     * @example
     *
     *    BudgetAlerts.create({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.create = function(data) {
      var url = {
        path: '/api/budget_alerts',
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
      if (data.budget == null) {
        throw new Error('Required field \'budget\' is missing from the passsed data object');
      } else {
        payload.budget = data.budget.encodeJSON ? data.budget.encodeJSON() : data.budget;
      }
      if (data.type == null) {
        throw new Error('Required field \'type\' is missing from the passsed data object');
      } else {
        payload.type = data.type;
      }
      if (data.frequency == null) {
        throw new Error('Required field \'frequency\' is missing from the passsed data object');
      } else {
        payload.frequency = data.frequency;
      }
      if (data.additional_emails != null) {
        payload.additional_emails = data.additional_emails.encodeJSON ? data.additional_emails.encodeJSON() : data.additional_emails;
      }
      if (data.attach_csv != null) {
        payload.attach_csv = data.attach_csv.encodeJSON ? data.attach_csv.encodeJSON() : data.attach_csv;
      }
      if (data.filters != null) {
        payload.filters = data.filters.encodeJSON ? data.filters.encodeJSON() : data.filters;
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
     * @name BudgetAlerts#index
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * List all BudgetAlerts.
     * @example
     *
     *    BudgetAlerts.index({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.index = function(data) {
      var url = {
        path: '/api/budget_alerts',
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
     * @name BudgetAlerts#show
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Show a specific BudgetAlert.
     * @example
     *
     *    BudgetAlerts.show({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.show = function(data) {
      var url = {
        path: '/api/budget_alerts/' + data.id + '',
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
     * @name BudgetAlerts#update
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Update the provided attributes of a BudgetAlert.
     * @example
     *
     *    BudgetAlerts.update({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.update = function(data) {
      var url = {
        path: '/api/budget_alerts/' + data.id + '',
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
      if (data.budget != null) {
        payload.budget = data.budget.encodeJSON ? data.budget.encodeJSON() : data.budget;
      }
      if (data.additional_emails != null) {
        payload.additional_emails = data.additional_emails.encodeJSON ? data.additional_emails.encodeJSON() : data.additional_emails;
      }
      if (data.type != null) {
        payload.type = data.type;
      }
      if (data.frequency != null) {
        payload.frequency = data.frequency;
      }
      if (data.attach_csv != null) {
        payload.attach_csv = data.attach_csv.encodeJSON ? data.attach_csv.encodeJSON() : data.attach_csv;
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
     * @name BudgetAlerts#destroy
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Delete a BudgetAlert.
     * @example
     *
     *    BudgetAlerts.destroy({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.destroy = function(data) {
      var url = {
        path: '/api/budget_alerts/' + data.id + '',
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
    return api;
  };
});
