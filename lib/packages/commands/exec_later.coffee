module.exports = ->
  add = (command, options = {}) ->
    add.commands.push({command, options})
  add.commands = []

  add
