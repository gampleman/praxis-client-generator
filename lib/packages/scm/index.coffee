{Package} = require 'dgeni'
module.exports = new Package('SCM', [])
  .factory 'ignoredFiles', -> []
