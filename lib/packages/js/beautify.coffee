beautify = require 'js-beautify'

module.exports = ->
  $runBefore: ['writeCode']
  $process: (docs) ->
    for doc in docs when doc.type is 'js'
      doc.rendered = beautify doc.rendered, indent_size: 2, preserve_newlines: no, end_with_newline: yes
    return
