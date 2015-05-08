module.exports = (globalConfig)->
  ->
    """
    /**
     * @ngdoc module
     * @name #{globalConfig.moduleName}
     * @description
     * Handles communication with the #{globalConfig.moduleName} API.
     */
    """
