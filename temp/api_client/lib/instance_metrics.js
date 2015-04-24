/**
 * @ngdoc service
 * @name InstanceMetrics
 * @description
 * This service is responsible for comunicating with InstanceMetrics resource.
 * Enables you to get aggregated metrics from instances, such as total_cost or lowest_instance_count.
 */
angular.module('APIClient').provider('InstanceMetrics', function() {
  this.$get = function($http) {
    var api = {};
    /**
 * @ngdoc method
 * @name InstanceMetrics#overall
 * @param {Object} data
 *    This represents the data needed to fullfill this request. It is an object
 *    with the following keys:
 *
 * @returns {Promise} A promise for the response object.
 * @description
 *           Calculates the overall metrics for instance usages in a time period, e.g. show me the
          total cost of all my instances during the last month.

 * @example
 *
 *    InstanceMetrics.overall({
 *
 *    }).then(function(result) {
 *
 *    });
 */
    api.overall = function(data) {
      var url = {
        path: '/api/instance_metrics/actions/overall',
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
      if (data.timezone != null) {
        params.timezone = data.timezone;
        delete data.timezone;
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
      if (data.metrics == null) {
        throw new Error('Required field \'metrics\' is missing from the passsed data object');
      } else {
        params.metrics = data.metrics.encodeJSON ? data.metrics.encodeJSON() : data.metrics;
        delete data.metrics;
      }
      if (data.instance_filters != null) {
        params.instance_filters = data.instance_filters.encodeJSON ? data.instance_filters.encodeJSON() : data.instance_filters;
        delete data.instance_filters;
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
 * @name InstanceMetrics#groupedOverall
 * @param {Object} data
 *    This represents the data needed to fullfill this request. It is an object
 *    with the following keys:
 *
 * @returns {Promise} A promise for the response object.
 * @description
 *           Calculates the overall metrics for instance usages in a time period and groups them into
          specified breakdown categories, e.g. show me the total cost of all my instances during the
          last month grouped by different accounts.

 * @example
 *
 *    InstanceMetrics.groupedOverall({
 *
 *    }).then(function(result) {
 *
 *    });
 */
    api.groupedOverall = function(data) {
      var url = {
        path: '/api/instance_metrics/actions/grouped_overall',
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
      if (data.timezone != null) {
        params.timezone = data.timezone;
        delete data.timezone;
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
      if (data.metrics == null) {
        throw new Error('Required field \'metrics\' is missing from the passsed data object');
      } else {
        params.metrics = data.metrics.encodeJSON ? data.metrics.encodeJSON() : data.metrics;
        delete data.metrics;
      }
      if (data.instance_filters != null) {
        params.instance_filters = data.instance_filters.encodeJSON ? data.instance_filters.encodeJSON() : data.instance_filters;
        delete data.instance_filters;
      }
      if (data.group == null) {
        throw new Error('Required field \'group\' is missing from the passsed data object');
      } else {
        params.group = data.group.encodeJSON ? data.group.encodeJSON() : data.group;
        delete data.group;
      }
      if (data.order != null) {
        params.order = data.order.encodeJSON ? data.order.encodeJSON() : data.order;
        delete data.order;
      }
      if (data.limit != null) {
        params.limit = data.limit;
        delete data.limit;
      }
      if (data.offset != null) {
        params.offset = data.offset;
        delete data.offset;
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
 * @name InstanceMetrics#timeSeries
 * @param {Object} data
 *    This represents the data needed to fullfill this request. It is an object
 *    with the following keys:
 *
 * @returns {Promise} A promise for the response object.
 * @description
 *           Calculates the metrics time series for instance usages in a time period allowing different
          time buckets (hour, 3 days, month, etc.), e.g. show me the lowest instance count of my
          instances per day during the last month.

 * @example
 *
 *    InstanceMetrics.timeSeries({
 *
 *    }).then(function(result) {
 *
 *    });
 */
    api.timeSeries = function(data) {
      var url = {
        path: '/api/instance_metrics/actions/time_series',
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
      if (data.timezone != null) {
        params.timezone = data.timezone;
        delete data.timezone;
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
      if (data.metrics == null) {
        throw new Error('Required field \'metrics\' is missing from the passsed data object');
      } else {
        params.metrics = data.metrics.encodeJSON ? data.metrics.encodeJSON() : data.metrics;
        delete data.metrics;
      }
      if (data.instance_filters != null) {
        params.instance_filters = data.instance_filters.encodeJSON ? data.instance_filters.encodeJSON() : data.instance_filters;
        delete data.instance_filters;
      }
      if (data.granularity == null) {
        throw new Error('Required field \'granularity\' is missing from the passsed data object');
      } else {
        params.granularity = data.granularity;
        delete data.granularity;
      }
      if (data.interval != null) {
        params.interval = data.interval;
        delete data.interval;
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
 * @name InstanceMetrics#groupedTimeSeries
 * @param {Object} data
 *    This represents the data needed to fullfill this request. It is an object
 *    with the following keys:
 *
 * @returns {Promise} A promise for the response object.
 * @description
 *           Calculates the metrics time series for instance usages in a time period allowing different
          time buckets (hour, 3 days, month, etc.) and groups them into specified breakdown
          categories, e.g. show me the lowest instance count of my instances per day during the last
          month grouped by accounts.

 * @example
 *
 *    InstanceMetrics.groupedTimeSeries({
 *
 *    }).then(function(result) {
 *
 *    });
 */
    api.groupedTimeSeries = function(data) {
      var url = {
        path: '/api/instance_metrics/actions/grouped_time_series',
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
      if (data.timezone != null) {
        params.timezone = data.timezone;
        delete data.timezone;
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
      if (data.metrics == null) {
        throw new Error('Required field \'metrics\' is missing from the passsed data object');
      } else {
        params.metrics = data.metrics.encodeJSON ? data.metrics.encodeJSON() : data.metrics;
        delete data.metrics;
      }
      if (data.instance_filters != null) {
        params.instance_filters = data.instance_filters.encodeJSON ? data.instance_filters.encodeJSON() : data.instance_filters;
        delete data.instance_filters;
      }
      if (data.granularity == null) {
        throw new Error('Required field \'granularity\' is missing from the passsed data object');
      } else {
        params.granularity = data.granularity;
        delete data.granularity;
      }
      if (data.interval != null) {
        params.interval = data.interval;
        delete data.interval;
      }
      if (data.group == null) {
        throw new Error('Required field \'group\' is missing from the passsed data object');
      } else {
        params.group = data.group.encodeJSON ? data.group.encodeJSON() : data.group;
        delete data.group;
      }
      if (data.order != null) {
        params.order = data.order.encodeJSON ? data.order.encodeJSON() : data.order;
        delete data.order;
      }
      if (data.limit != null) {
        params.limit = data.limit;
        delete data.limit;
      }
      if (data.offset != null) {
        params.offset = data.offset;
        delete data.offset;
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
