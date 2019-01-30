# SoftIndex Node.js Voting Test Task [![code with hearth](https://img.shields.io/badge/Code_with_%E2%9D%A4-by_Vladyslav_Dukhin-blue.svg?style=flat-square)](https://github.com/primeare)

> The more you know, the less you fear

## Install
```sh
npm install
```

### Database

You will need a running MySQL server.

You need to create a database in MySQL and make changes in project's configuration file `config/default.json`. Change `host`, `database`, `username` and `password` parameters to follow your MySQL configuration.

Alternatively, you can use corresponding environment variables `DB_HOST`, `DB_DATABASE`, `DB_USERNAME` and `DB_PASSWORD` to override configuration file parameters.

Also, it is possible to set environment variable `DROP` to true that will cause force dropping of database's tables.

## Run

To start HTTP server type in command line:

```sh
npm start
```

Server will run on `http://localhost` on port `3333` by default.

## Test

To run Jest tests type in command line:

```sh
npm test
```

To run lint checks type in command line:

```sh
npm run lint
```

## Documentation

To generate API and Code documentation type in command line:

```sh
npm run doc

// OR

npm run code-doc
npm run api-doc
```
