module.exports = (pack) ->
  dgeni = new Dgeni([pack])
  dgeni.generate().then ->
    console.log('Finished generating docs');
  .done()

module.exports.builtin = (name) ->
  require "./packages/#{name}"

module.exports.Package = require('dgeni').Package
