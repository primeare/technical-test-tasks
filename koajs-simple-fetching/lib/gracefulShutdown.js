'use strict';

const logger = require('./logger');

/**
 * Gracefully shuts down HTTP server
 * @param {Object} server HTTP server instance
 * @param {Number} [code] process exit code
 * @returns {undefined}
 */
module.exports = (server, code = 0) => {
  logger.info('Shutting down server...');
  server.close(() => process.exit(code)); // eslint-disable-line no-process-exit
};
