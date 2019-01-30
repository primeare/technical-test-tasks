'use strict';

const express = require('express');
const config = require('config');
const components = require('./components');
const logger = require('./lib/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

const BAD_REQUEST_CODE = 400;
const SERVER_ERROR_CODE = 500;

const requestsLogger = morgan(config.get('logging.requestLoggerType'), {
  stream: logger.stream,
});

app.use(requestsLogger);
app.use(express.json({ type: ['json', 'application/csp-report'] }));
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.disable('x-powered-by');

app.use('/themes', components.theme.api);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.message.endsWith('Validation error')) {
    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_CODE,
      error: 'Validation error. Duplicated entry.',
    });
  }

  return res.status(SERVER_ERROR_CODE).json({
    status: SERVER_ERROR_CODE,
    error: err.message,
  });
});

module.exports = app;
