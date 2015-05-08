module.exports = (typeConverter, typeName, attributeName)->
  (doc, key, attribute) ->
    """
    /**
     * @ngdoc property
     * @name #{typeName doc.name}.#{attributeName(key)}
     * @type {#{typeConverter attribute.type}}
     * @description
     * #{attribute.description}
     */
    """
