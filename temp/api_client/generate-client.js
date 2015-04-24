module.exports = function(Package, builtin) {
  return new Package('MyGen', [builtin('angular'), builtin('bower')])
    .config(function(globalConfig) {
      globalConfig.praxisDocsPath = '../analytics_api_service/docs/api/1.0';
      globalConfig.outputPath = '.';
      globalConfig.moduleName = 'APIClient';
      globalConfig.project = false;
    });
};