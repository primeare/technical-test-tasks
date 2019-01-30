'use strict';

const fs = require('fs');
const path = require('path');
const config = require('config');
const winston = require('winston');

const createStream = (name) => {
  const logPath = path.join(__dirname, `../${name}.log.txt`);
  return fs.createWriteStream(logPath);
};

const env = config.util.getEnv('NODE_ENV');
const logger = winston.createLogger({
  // handled exceptions will not cause process.exit
  exitOnError: false,
});

logger.stream = {
  write: msg => logger.info(msg),
};

if (env === 'development') {
  const opts = config.get('logging.console');
  const consoleTransport = new winston.transports.Console(opts);
  logger.format = winston.format.cli();
  logger.add(consoleTransport);
  logger.exceptions.handle(consoleTransport);
} else {
  const opts = { stream: createStream(env) };
  const fsTransport = new winston.transports.Stream(opts);
  logger.format = winston.format.simple();
  logger.exitOnError = true;
  logger.add(fsTransport);
  logger.exceptions.handle(fsTransport);
}

logger.on('error', (err) => {
  throw err;
});

module.exports = logger;
