'use strict';

const controller = require('./businessLogic');
const gracefulShutdown = require('../../lib/gracefulShutdown');

/** @module mixin */

/**
 * Checks if provided pass is correct for the API endpoint
 * @memberof module:mixin
 * @param {String} path API URL path
 * @returns {Boolean} `true` if given path is correct
 */
const correctPath = path => path === '/api/data' || path === '/api/data/';

/**
 * API endpoint middleware (`/api/data`)
 * @memberof module:mixin
 * @param {Object} ctx Koa's context
 * @param {Function} next Koa's next middleware
 * @returns {Promise} void
 */
module.exports = async (ctx, next) => {
  if (ctx.method !== 'POST' || !correctPath(ctx.path)) return void next();
  const body = ctx.request.body;
  const result = await controller(body);
  if (result == null) {
    ctx.body = { message: 'shutting down' };
    return void gracefulShutdown(ctx.server, 2);
  }
  ctx.body = result;
};
