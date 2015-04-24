/**
 * @ngdoc service
 * @name CurrentUser
 * @description
 * This service is responsible for comunicating with CurrentUser resource.
 * Represents the currently logged-in user. This resource is not included in the public docs.
 */
angular.module('APIClient').provider('CurrentUser', function() {
  this.$get = function($http) {
    var api = {};
    /**
     * @ngdoc method
     * @name CurrentUser#show
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Show the user's details.
     * @example
     *
     *    CurrentUser.show({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.show = function(data) {
      var url = {
        path: '/api/current_user',
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
     * @name CurrentUser#update
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Update the user's details.
     * @example
     *
     *    CurrentUser.update({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.update = function(data) {
      var url = {
        path: '/api/current_user',
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
      if (data.first_name != null) {
        payload.first_name = data.first_name;
      }
      if (data.last_name != null) {
        payload.last_name = data.last_name;
      }
      if (data.email != null) {
        payload.email = data.email;
      }
      if (data.timezone != null) {
        payload.timezone = data.timezone;
      }
      if (data.company != null) {
        payload.company = data.company;
      }
      if (data.phone != null) {
        payload.phone = data.phone;
      }
      if (data.password == null) {
        throw new Error('Required field \'password\' is missing from the passsed data object');
      } else {
        payload.password = data.password;
      }
      if (data.new_password != null) {
        payload.new_password = data.new_password;
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
 * @name CurrentUser#cloudAccounts
 * @param {Object} data
 *    This represents the data needed to fullfill this request. It is an object
 *    with the following keys:
 *
 * @returns {Promise} A promise for the response object.
 * @description
 * Creates a cloud account in the first available child account,
          or the account used to login if there are no available child accounts.
 * @example
 *
 *    CurrentUser.cloudAccounts({
 *
 *    }).then(function(result) {
 *
 *    });
 */
    api.cloudAccounts = function(data) {
      var url = {
        path: '/api/current_user/actions/cloud_accounts',
        method: 'POST'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var payload = {};
      if (data.cloud_vendor_name == null) {
        throw new Error('Required field \'cloud_vendor_name\' is missing from the passsed data object');
      } else {
        payload.cloud_vendor_name = data.cloud_vendor_name;
      }
      if (data.aws_account_number == null) {
        throw new Error('Required field \'aws_account_number\' is missing from the passsed data object');
      } else {
        payload.aws_account_number = data.aws_account_number;
      }
      if (data.aws_access_key_id == null) {
        throw new Error('Required field \'aws_access_key_id\' is missing from the passsed data object');
      } else {
        payload.aws_access_key_id = data.aws_access_key_id;
      }
      if (data.aws_secret_access_key == null) {
        throw new Error('Required field \'aws_secret_access_key\' is missing from the passsed data object');
      } else {
        payload.aws_secret_access_key = data.aws_secret_access_key;
      }
      return $http({
        method: url.method,
        url: url.path,
        headers: headers,
        data: payload,
      }).then(function(response) {
        return response.data;
      });
    };
    /**
     * @ngdoc method
     * @name CurrentUser#onboardingStatus
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Gets the onboarding status of the user.
     * @example
     *
     *    CurrentUser.onboardingStatus({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.onboardingStatus = function(data) {
      var url = {
        path: '/api/current_user/actions/onboarding_status',
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
     * @name CurrentUser#environment
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Gets various environment settings.
     * @example
     *
     *    CurrentUser.environment({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.environment = function(data) {
      var url = {
        path: '/api/current_user/actions/environment',
        method: 'GET'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      return $http({
        method: url.method,
        url: url.path,
        headers: headers,
      }).then(function(response) {
        return response.data;
      });
    };
    return api;
  };
});
