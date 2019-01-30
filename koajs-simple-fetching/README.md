# Koa.js Application with fetching external API

## Task

1. Implement API endpoint that enhance provided JSON object with additional random-valued parameter. Value varies between 1 and 6.
  - When JSON object with command `shutdown` is provided, server should terminate with exit code 2.
  - Service must use as little resources as possible.
2. Implement API endpoint that fetches data from external API and returns result of that fetch.
  - Service needs to be able to serve fetched responses of any size.

## Install

You should have Node.js run-time and NPM packages manager already pre-installed.

To install required dependencies type in command line:

```sh
npm install
```

## Run

To start HTTP server type in command line:

```sh
npm start
```

Server will run on http://localhost on port 3000 by default.

To start HTTP server on specific host and/or port use environment variables `HOST` and `PORT`:

```sh
PORT=3333 npm start
```

## Test

To run linter checks type in command line:

```sh
npm run lint
```

## Documentation

To generate code documentation type in command line:

```sh
npm run doc
```
