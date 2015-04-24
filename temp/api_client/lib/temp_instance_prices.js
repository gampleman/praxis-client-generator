/**
 * @ngdoc service
 * @name TempInstancePrices
 * @description
 * This service is responsible for comunicating with TempInstancePrices resource.
 * This is a temporary API call that can be used by the Cloud Analytics UI until the
        Pricing Service is live, at which point this API call will be deleted. This is not included in the public docs.
 */
angular.module('APIClient').provider('TempInstancePrices', function() {
  this.$get = function($http) {
    var api = {};
    /**
     * @ngdoc method
     * @name TempInstancePrices#index
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Returns a JSON blob with all prices for Scenario Builder.
     * @example
     *
     *    TempInstancePrices.index({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.index = function(data) {
      var url = {
        path: '/api/temp_instance_prices',
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
