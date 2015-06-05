#!/usr/bin/env coffee

program = require 'commander'
{version} = JSON.parse(require('fs').readFileSync(__dirname + '/../package.json', 'utf-8'))
Dgeni = require 'dgeni'
_ = require 'lodash-fp'

{getPackages} = require '../lib/cli.coffee'

program
  .version version

program
  .command 'regenerate'
  .description 'Loads the local config file and regenerates source files'
  .action ->
    pack = require process.cwd()  + '/generate-client.js'
    builtin = (f) ->
      require "../lib/packages/#{f}"
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
    getPackages(options).then (packages) ->
      packages = for p in packages
        if p.match /\/|\./
          require p
        else
          try
            require "../lib/packages/#{p}"
          catch e
            console.error e
            throw e
      pack = new Dgeni.Package('MyGen', packages)
        .processor 'generateRunFile', ->
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
          globalConfig.outputPath = _.snakeCase appName
          globalConfig.moduleName = appName
          globalConfig.project = yes
      dgeni = new Dgeni([pack])
      dgeni.generate().then ->
        console.log('Finished generating docs');
      .done()
    .catch (e) ->
      console.error e
program.parse process.argv
