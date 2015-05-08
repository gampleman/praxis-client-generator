module.exports = (methodName) ->
  (doc, action) ->
    """
    /**
     * @ngdoc method
     * @name #{doc.name}##{methodName(action.name)}
     * @param {Object} data
     *    This represents the data needed to fullfill this request. It is an object
     *    with the following keys:
     *
     * @returns {Promise} A promise for the response object.
     * @description
     * #{action.description}
     * @example
     *
     *    #{doc.name}.#{methodName(action.name)}({
     *
     *    }).then(function(result) {
     *
     *    });
     */
    """
