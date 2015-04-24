/**
 * @ngdoc service
 * @name CloudBillMetrics
 * @description
 * This service is responsible for comunicating with CloudBillMetrics resource.
 * Enables you to get breakdowns of your cloud bill costs. Only Amazon Web Services is supported for now.
 */
angular.module('APIClient').provider('CloudBillMetrics', function() {
  this.$get = function($http) {
    var api = {};
    /**
 * @ngdoc method
 * @name CloudBillMetrics#groupedTimeSeries
 * @param {Object} data
 *    This represents the data needed to fullfill this request. It is an object
 *    with the following keys:
 *
 * @returns {Promise} A promise for the response object.
 * @description
 * Calculates the time series of costs for cloud bills in a time period grouped into monthly
          time buckets and groups them into specified breakdown categories, e.g. show me cost of my
          cloud bills per month during the last year grouped by product.
 * @example
 *
 *    CloudBillMetrics.groupedTimeSeries({
 *
 *    }).then(function(result) {
 *
 *    });
 */
    api.groupedTimeSeries = function(data) {
      var url = {
        path: '/api/cloud_bill_metrics/actions/grouped_time_series',
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
      if (data.start_time == null) {
        throw new Error('Required field \'start_time\' is missing from the passsed data object');
      } else {
        params.start_time = data.start_time.encodeJSON ? data.start_time.encodeJSON() : data.start_time;
        delete data.start_time;
      }
      if (data.end_time == null) {
        throw new Error('Required field \'end_time\' is missing from the passsed data object');
      } else {
        params.end_time = data.end_time.encodeJSON ? data.end_time.encodeJSON() : data.end_time;
        delete data.end_time;
      }
      if (data.cloud_bill_filters != null) {
        params.cloud_bill_filters = data.cloud_bill_filters.encodeJSON ? data.cloud_bill_filters.encodeJSON() : data.cloud_bill_filters;
        delete data.cloud_bill_filters;
      }
      if (data.group == null) {
        throw new Error('Required field \'group\' is missing from the passsed data object');
      } else {
        params.group = data.group.encodeJSON ? data.group.encodeJSON() : data.group;
        delete data.group;
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
