# The Overrides Package

The Overrides package allows you to override the way other generators work in specific circumstances.

## Usage (as a user)

If you want to override how a certain piece of code is generated, add the `globalConfig`
property `debugOverrides: true`. This will generate code with comments inserted
(possibly invalid), in every place that can be overridden with a key path that you can use.

The key paths are `.` separated paths. You can replace any segment with the `*` operator:
this will match any one segment. `**` will match any number of segments.

Then you can configure your generator like this:

```
.config (override) ->
  override('angular.provider.method.budget_alerts.index', 'function() { throw 'not allowed';}')

```

This will then override the generation of that specific piece of code with a method that
throws an exception.

If there are multiple overrides that match, the more specific one (with less `*`) will win. In case of ties the later defined one will win.

Alternatively each file in your local `overrides` directory is automatically registered
as an override based on its filename.

## Usage (as a package provider)

You need to add the `Overrides` package to your dependencies. Then inject
`o` (short name for convenience) or `overridable` (for explicitness). They are called like
this:

```
$process: (docs) ->
  o 'provider', ->
    docs.map (doc) ->
      o className(doc.name), ->
        "some code"

```

A more convenient way is often using the `template(path, locals)(data)` function which will load a template
from the provided file path, compile it with the provided locals and return a function
that takes a data argument. This uses lodash templates under the hood. The filename
will be used as an override segment.
