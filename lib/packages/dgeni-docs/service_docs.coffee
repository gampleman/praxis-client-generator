module.exports = ->
  (doc) ->
    """
    /**
     * @ngdoc service
     * @name #{doc.name}
     * @description
     * This service is responsible for comunicating with #{doc.name} resource.
     * #{doc.description}
     */
    """
