# Praxis Client Generator

This project takes Praxis JSON api doc output and transforms it into source code
that implements a client for that particular API.

**NB: This is currently a work in progress and the output is alpha level quality.**

The idea is to use Dependency Injection so that any output language/framework/libraby
can be supported. The first framework/language is AngularJS, but some work has started
on a Restclient/Ruby client.

# Usage

Install with `npm i -g praxis-client-generator` (this currently doesn't work since I can't be bothered to publish it until it's more done that it is now).

Run

```bash
praxis-client-generator new APIClient ../path/to-praxis-app/docs/1.0
```

this will generate an AngularJS module called `APIClient` at `./api_client` based on the
JSON files praxis generates. It will manage its dependencies using bower.

It will also create a `generate-client.js` script for you, where you can tweak
the exact settings of this tool and regenerate the source parts of your project with

```bash
praxis-client-generator regenerate
```

The real power of this tool comes from building and combining packages, which make it easy
to generate clients in various languages and frameworks.

# Packages

This software ships with many packages that cooperate to make the final output.
Each package is composed of a number of processors and services. Processors are
parts of the processing pipeline which receives a series of document objects and
transforms this collection. Each processor looks like this:

~~~coffee
module.exports = (dependencies) ->
  $runBefore: ['someOtherProcessors']
  $runAfter: ['processor2']
  $process: (docs) ->
    doSomething(docs)
    return docs
~~~

The `$runBefore` and `$runAfter` properties allow you flexible control over the
ordering in the pipeline without necessary knowledge about all other procesors
in the pipeline.

The two processors in every generator pipeline are `readDocs` - which reads the praxis
metadata files and creates document objects out of them, and `writeCode` - which reads
the `path` and `rendered` property of each document object and writes them to disk.

`$process` is the function that is called to transform the document collection. It
can either return synchronously, or it can return a promise.

## Builtin packages

There are a number of builtin packages, here is a list of them. Each will eventually
have their own readme.

#### System packages

These packages are abstract and are considered useful for any package implementation:

- [Overrides](lib/packages/overrides/readme.md) allows users to customise the generated output.
- [Dependencies](lib/packages/dependencies/readme.md) is for adding dependencies to your project.
- [Commands](lib/packages/commands/readme.md) allows running arbitrary commands after code generation is complete.

#### Language packages

These implement helpers needed for a particular language. Each language should
implement:

- `inlineComment(str)` method that takes a string and returns a string that is a comment.

It is recommended for familiarity that the following methods (as applicable) are implemented, embodiying the conventions of the language:

- `methodName(name)`
- `attributeName(name)`
- `typeName(name)`

See:

- [JS](lib/packages/js/readme.md) implements this for the JavaScript language.

#### Technology packages

These packages implement what's needed for various parts of a technology stack.
Choosing which ones to use can give your project a slightly different flavor.

#### Main packages

These packages are primarily responsible for creating the actual client. They often
depend on a host of other packages to get their job done.

- [Angular](lib/packages/angular/readme.md) is a client for AngularJS.

# Writing your own client generator

I suggest taking a look at the source code of the angular package. You can reuse
a number of packages, as all have essentially been built with composibility in mind.

# Gotchas

For the client to work properly the Praxis specification must be complete. This means
that it must specify the endpoints, prefixes, required headers and authentication
mechanisms, otherwise the client generator has no way of knowing how to peform those
tasks.

# License

(c) 2015 RightScale, Inc. and Jakub Hampl

MIT License
