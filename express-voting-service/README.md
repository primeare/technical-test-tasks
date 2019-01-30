# Express.js Voting Application

> The more you know, the less you fear

## Task

Implement REST API for voting service with the use of Express.js and MySQL.
In case of unexpected errors - return `500 Internal Server Error`.

### API Endpoints

* `POST /themes`

  Request:

  ```json
  {
    "name": "string"
  }
  ```

  Success Response:

  ```json
  {
    "error": null,
    "themeId": "number"
  }
  ```

  Error Response (Validation error):

  ```json
  {
    "error": "Field name length cannot be grater than 1024"
  }
  ```

* `GET /themes/{themeId}`

  Response:

  ```json
  {
    "name": "string",
    "votes": {
      "yes": "number",
      "no": "number"
    }
  }
  ```

* `POST /themes/{themeId}/yes`

  Response: `OK`

* `POST /themes/{themeId}/no`

  Response: `OK`

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
