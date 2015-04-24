# Praxis Client Generator

This project takes Praxis JSON api doc output and transforms it into source code
that implements a client for that particular API.

**NB: This is currently a work in progress and is not usable. Yet.**

The idea is to use Dependency Injection so that any output language/framework/libraby
can be supported. Initially this will be targeted for AngularJS and then will be
generalized.


# Gotchas

For the client to work properly the Praxis specification must be complete. This means
that it must specify the endpoints, prefixes, required headers and authentication
mechanisms, otherwise the client generator has no way of knowing how to peform those
tasks.

# License

(c) 2015 RightScale, Inc. and Jakub Hampl

MIT License
