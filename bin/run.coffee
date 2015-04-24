#!/usr/bin/env coffee

program = require 'commander'
{version} = JSON.parse(require('fs').readFileSync(__dirname + '/../package.json', 'utf-8'))
Dgeni = require 'dgeni'
_ = require 'lodash-fp'

program
  .version version

program
  .command 'regenarate'
  .description 'Loads the local config file and regenerates source files'
  .action (options) ->
    pack = require process.pwd  + '/generate-client.js'
    builtin = (f) ->
      require "../lib/packages/#{p}"
    box = pack(Dgeni.Package, builtin)
    dgeni = new Dgeni([box])
    dgeni.generate().then ->
      console.log('Finished generating docs');
    .done()

program
  .command 'new <app_name> <praxis_docs_path>'
  .description 'Generates a new client project named app_name from praxis json at praxis_docs_path'
  .option '-p, --packages [package_name]', 'The main output package', (t) ->
    t.split(',')
  .action (appName, docsPath, options) ->
    packages = for p in (options.packages || [])
      if p.match /\/|\./
        require p
      else
        require "../lib/packages/#{p}"
    pack = new Dgeni.Package('MyGen', packages)
      .processor 'generateRunFile', (globalConfig, dependencies) ->
        $runBefore: ['writeCode']
        $process: (docs) ->
          reqPackage = (p) ->
            if p.match /\/|\./
              "require('#{p}')"
            else
              "builtin('#{p}')"
          docs.push({
            type: 'js'
            outputPath: 'generate-client.js'
            rendered: """
          module.exports = function(Package, builtin) {
            return new Package('MyGen', [#{_.map(reqPackage, options.packages).join(', ')}])
              .config(function(globalConfig) {
                globalConfig.praxisDocsPath = '#{docsPath}';
                globalConfig.outputPath = '.';
                globalConfig.moduleName = '#{appName}';
                globalConfig.project = false;
              });
          };
          """})
          return

      .config (globalConfig) ->
        globalConfig.praxisDocsPath = docsPath
        globalConfig.outputPath = "./temp/#{_.snakeCase appName}"
        #globalConfig.headers = 'X-CSRF-TOKEN': 'CA.csrf_token'
        globalConfig.moduleName = appName
        globalConfig.project = yes
    dgeni = new Dgeni([pack])
    dgeni.generate().then ->
      console.log('Finished generating docs');
    .done()


program.parse process.argv