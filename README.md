# Praxis Client Generator

This project takes Praxis JSON api doc output and transforms it into source code
that implements a client for that particular API.

**NB: This is currently a work in progress and is not usable. Yet.**

The idea is to use Dependency Injection so that any output language/framework/libraby
can be supported. Initially this will be targeted for AngularJS and then will be
generalized.

# Usage

Install with `npm i -g praxis-client-generator` (this currently doesn't work since I can't be bothered to publish it until it's more done that it now).

Run

```bash
praxis-client-generator new APIClient ../path/to-praxis-app/docs/1.0 --packages angular,bower
```

this will generate an AngularJS module called `APIClient` at `./api_client` based on the
JSON files praxis generates. It will manage its dependencies using bower.

The real power of this tool comes from building and combining packages, which make it easy
to generate clients in various languages and frameworks. More documentation on this
is forthcoming. For now you can look into lib/packages to see what is available.

# Example

**This is still WIP: I plan to improve the output significantly**.

This resource:

~~~ruby
module V1
  module ApiResources
    class CloudBills
      include Praxis::ResourceDefinition
      include V1::BaseResource

      description 'Enables you to get details about cloud bills. Only Amazon Web Services is supported for now.'

      action :filter_options do
        description 'Gets the filter options which can be used for filtering the cloud bill breakdown calls.'
        routing do
          get '/actions/filter_options'
        end

        params do
          attribute :view, String, default: 'default'
          attribute(*SharedParams::Generic.start_time)
          attribute(*SharedParams::Generic.end_time)
          attribute(*SharedParams::CloudBills.filters)
          attribute :filter_types, Attributor::Collection.of(String), required: true,
            member_options: { values: Constants.filter_types_for_resource_type('cloud_bill').keys },
            description: 'Restricts the filter options to the specified keys.'
        end

        response :ok, media_type: MediaTypes::Filter
      end
    end
  end
end
~~~

will generate this file (using the angular package):

~~~javascript
/**
 * @ngdoc service
 * @name CloudBills
 * @description
 * This service is responsible for comunicating with CloudBills resource.
 * Enables you to get details about cloud bills. Only Amazon Web Services is supported for now.
 */
angular.module('APIClient').provider('CloudBills', function() {
  this.$get = function($http) {
    var api = {};
    /**
     * @ngdoc method
     * @name CloudBills#filterOptions
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * Gets the filter options which can be used for filtering the cloud bill breakdown calls.
     * @example
     *
     *    CloudBills.filterOptions({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    api.filterOptions = function(data) {
      var url = {
        path: '/api/cloud_bills/actions/filter_options',
        method: 'GET'
      };
      var headers = {
        'X-API-VERSION': '1.0'
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
      if (data.filter_types == null) {
        throw new Error('Required field \'filter_types\' is missing from the passsed data object');
      } else {
        params.filter_types = data.filter_types.encodeJSON ? data.filter_types.encodeJSON() : data.filter_types;
        delete data.filter_types;
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

~~~

# Gotchas

For the client to work properly the Praxis specification must be complete. This means
that it must specify the endpoints, prefixes, required headers and authentication
mechanisms, otherwise the client generator has no way of knowing how to peform those
tasks.

# License

(c) 2015 RightScale, Inc. and Jakub Hampl

MIT License
