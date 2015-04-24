/**
 * @ngdoc service
 * @name Users
 * @description
 * This service is responsible for comunicating with Users resource.
 * Users can have various permissions on multiple accounts. Users with admin permissions in an account
        can modify that account's users. This resource is not included in the public docs.
 */
angular.module('APIClient').provider('Users', function() {
  this.$get = function($http) {
    var api = {};
    /**
 * @ngdoc method
 * @name Users#create
 * @param {Object} data
 *    This represents the data needed to fullfill this request. It is an object
 *    with the following keys:
 *
 * @returns {Promise} A promise for the response object.
 * @description
 * Create a new user with the requested permissions in the requested accounts, and emails
          them the login details. Returns an error if the user already exists.
 * @example
 *
 *    Users.create({
 *
 *    }).then(function(result) {
 *
 *    });
 */
    api.create = function(data) {
      var url = {
        path: '/api/users',
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
      if (data.email == null) {
        throw new Error('Required field \'email\' is missing from the passsed data object');
      } else {
        payload.email = data.email;
      }
      if (data.accounts == null) {
        throw new Error('Required field \'accounts\' is missing from the passsed data object');
      } else {
        payload.accounts = data.accounts.encodeJSON ? data.accounts.encodeJSON() : data.accounts;
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
     * @name Users#index
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * List all users.
     * @example
     *
     *    Users.index({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.index = function(data) {
      var url = {
        path: '/api/users',
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
     * @name Users#show
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Show a specific user.
     * @example
     *
     *    Users.show({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.show = function(data) {
      var url = {
        path: '/api/users/' + data.id + '',
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
 * @name Users#update
 * @param {Object} data
 *    This represents the data needed to fullfill this request. It is an object
 *    with the following keys:
 *
 * @returns {Promise} A promise for the response object.
 * @description
 * Update a specific user's account permissions.
          This cannot be used to update other user parameters such as their name or password.
 * @example
 *
 *    Users.update({
 *
 *    }).then(function(result) {
 *
 *    });
 */
    api.update = function(data) {
      var url = {
        path: '/api/users/' + data.id + '',
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
      if (data.accounts != null) {
        payload.accounts = data.accounts.encodeJSON ? data.accounts.encodeJSON() : data.accounts;
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
 * @name Users#invite
 * @param {Object} data
 *    This represents the data needed to fullfill this request. It is an object
 *    with the following keys:
 *
 * @returns {Promise} A promise for the response object.
 * @description
 * Invites a user to the requested account and gives them the required permissions
          so they can add/edit cloud credentials, the user is created if they don't already exist.
          This is used during new user onboarding as the user who signs-up might not be the person who has
          the cloud credentials required to connect their clouds to RightScale.
 * @example
 *
 *    Users.invite({
 *
 *    }).then(function(result) {
 *
 *    });
 */
    api.invite = function(data) {
      var url = {
        path: '/api/users/actions/invite',
        method: 'POST'
      };
      var headers = {
        'X-API-VERSION': '1.0'
        undefined
      };
      var payload = {};
      if (data.account_id != null) {
        payload.account_id = data.account_id;
      }
      if (data.email != null) {
        payload.email = data.email;
      }
      if (data.message != null) {
        payload.message = data.message;
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
    return api;
  };
});
