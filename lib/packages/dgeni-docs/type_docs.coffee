module.exports = (typeConverter, typeName, attributeName)->
  (doc) ->
    """
    /**
     * @ngdoc type
     * @name #{typeName doc.name}
     * @description
     * #{doc.description}
     */
    """
