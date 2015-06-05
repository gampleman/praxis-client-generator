# The Commands package

The most important injectable is `execLater(string, [options])` which takes a string
command. This command will be executed after code generation completes. If you pass
an array, the commands will be executed in sequence (i.e. each will wait before the
preceding completes). Options is what child_process#exec takes - `cwd` defaults
to the output path.
