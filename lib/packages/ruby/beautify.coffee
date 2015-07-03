Promise = require 'promise'
{spawn} = require 'child_process'

module.exports = (exec, log) ->
  beautify = (code) ->
    new Promise (success, failure) ->
      cp = spawn 'bundle', ['exec', 'ruby-beautify', '--spaces', '-c', '2'], {cwd: __dirname}
      data = ""
      err = ""
      cp.stdout.on 'data', (str) ->
        console.log str.toString()
        data += str.toString()
      cp.stderr.on 'data', (str) ->
        log.error str.toString()
        console.log str.toString()
        err += str.toString()
      cp.on 'close', (code) ->
        console.log "Code: #{code}"
        if code is 0
          success(data)
        else
          failure(err)
      cp.stdin.on 'error', ->
        console.log.apply(console, arguments)
      cp.stdin.write(code, 'utf-8')
      cp.stdin.end()

  $runBefore: ['writeCode']
  $process: (docs) ->
    promises = for doc in docs when doc.type is 'ruby'
      do (doc) ->
        beautify(doc.rendered).then (result) ->
          doc.rendered = result

    return Promise.all(promises).then(-> docs)
