'use strict';

const controller = require('./businessLogic');
const API_REG_EXP = /^\/api\/todos\/?([0-9]*)$/;
/** @module todos-proxy */

/**
 * API endpoint middleware (`/api/todos/:id`)
 * @memberof module:todos-proxy
 * @param {Object} ctx Koa's context
 * @param {Function} next Koa's next middleware
 * @returns {Promise} void
 */
module.exports = async (ctx, next) => {
  if (ctx.method !== 'GET') return void next();
  const matches = ctx.path.match(API_REG_EXP);
  if (matches == null || matches.length === 0) return void next();
  const id = matches[1];
  // proxy stream of request to external resource
  ctx.body = controller(id);
};
