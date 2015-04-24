module.exports = ->
  $runAfter: ['renderCode']
  $runBefore: ['writeCode']
  $process: (docs) ->
    for doc in docs when doc.type is 'json'
      doc.rendered = JSON.stringify doc.contents, null, 2
    return
