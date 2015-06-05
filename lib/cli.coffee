# This file provides utility functions to the CLI

inquirer = require 'inquirer'
Promise = require 'promise'

mainPackages = ['angular']
auxiliaryPackageOptions =
  angular: ['bower', 'npm', 'lodash', 'jasmine']
  general: ['git']

builtins = ['commands', 'overrides', 'dependencies']

# This function (asynchronously) gets a list of packages to include
module.exports.getPackages = (options) ->
  if options.packages and options.packages.length > 0
    Promise.resolve(options.packages.concat(builtins))
  else
    new Promise (resolve, reject) ->
      inquirer.prompt [
        type: 'rawlist'
        name: 'mainPackage'
        message: 'Which main package would you like to use to generate your code? (choose one or add the path to your own):'
        choices: mainPackages
      ,
        type: 'checkbox'
        name: 'auxiliaryPackages'
        message: 'Add some other packages to your project'
        choices: ({mainPackage}) -> auxiliaryPackageOptions[mainPackage].concat auxiliaryPackageOptions.general
      ], ({mainPackage, auxiliaryPackages}) ->
        resolve([mainPackage].concat(auxiliaryPackages, builtins))
