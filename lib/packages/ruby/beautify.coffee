Promise = require 'promise'
{spawn} = require 'child_process'

module.exports = (exec, log) ->
  beautify = (code) ->
    new Promise (success, failure) ->
      console.log('bundle', ['exec', 'ruby-beautify', '--spaces', '-c', '2'], {cwd: __dirname})
      cp = spawn 'bundle', ['exec', 'ruby-beautify', '--spaces', '-c', '2'], {cwd: __dirname}
      data = ""
      err = ""
      cp.stdout.on 'data', (str) -> data += str.toString()
      cp.stderr.on 'data', (str) -> err += str.toString()
      cp.on 'close', (code) ->
        if code is 0
          success(data)
        else
          failure(err)
      cp.stdin.write(code, 'utf-8')
      cp.stdin.end()

  $runBefore: ['writeCode']
  $process: (docs) ->
    promise = Promise.resolve([])
    for doc in docs when doc.type is 'ruby'
      do (doc) ->
        promise = promise.then () ->
          console.log "Beautifying #{doc.name}"
          beautify(doc.rendered).then (result) ->
            doc.rendered = result

    return promise.then ->
      docs
    , (failure) ->
      console.log(failure)
      docs
