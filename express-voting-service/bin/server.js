'use strict';
/* eslint no-process-exit: "off" */

const config = require('config');
const app = require('../app');
const db = require('../lib/db');
const logger = require('../lib/logger');
const host = config.get('server.host'), port = config.get('server.port');
let server = null;

db.sync({
  force: config.get('db.dropDatabase'),
}).then(() => {
  logger.info('Databases are in sync');
  server = app.listen(port, host);
  logger.info('Server is running on port: ' + port);
}).catch((err) => {
  logger.error(err);
  process.exit(1);
});

const gracefulExit = () => {
  logger.info('Stopping server...');
  if (server != null) {
    server.close(() => {
      db.shutdown().then(() => {
        logger.info('Have a nice day!');
        process.exit(0);
      }).catch((err) => {
        logger.error(err);
        process.exit(1);
      });
    });
  }
};

process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);
