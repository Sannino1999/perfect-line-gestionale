# Testing

Run `npm test` for the deterministic domain tests. CI also runs typecheck and production build.

Database integration tests should be run against a disposable MySQL database before the first production release. Never run destructive tests against the production database.