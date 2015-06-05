# The Dependencies package

This package allows you to declare dependencies irrespective of how they will be
later installed. This way you can be dependency manager agnostic.

## Usage

You can inject the `dependencies` object and call `addDependency(type, id, options)`
on it.

- `type` is a string telling what kind of dependency it is. Currently recognised types are `client-js`, `node-js`, `client-js-dev` and `node-js-dev`. The `dev` suffix indicates a developemnt depedency.
- `id` is the name/url of the dependency. This will end up being passed to dependency manager.
- `options` is an object that specifies other properties of the dependency. A comonly recognised option is `version`.

## Implementing a dependency manager

You can call the `dependencies(type)` method on the `dependencies` object. This
will give you an array of dependencies of that particular type.
