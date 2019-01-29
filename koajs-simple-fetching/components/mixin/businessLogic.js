'use strict';

const config = require('config');
const MIN = config.get('business.mixin.min');
const MAX = config.get('business.mixin.max');

/**
 * Returns pseudo-randomly generated integer value
 * @memberof module:mixin
 * @param {Number} min minimal integer value
 * @param {Number} max maximal integer value
 * @returns {Number} pseudo-random integer
 */
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Extends object with additional random-valued parameter `a`
 * @memberof module:mixin
 * @param {Object} data data to extend
 * @returns {Promise<Object>} extended object
 */
module.exports = async (data) => {
  if (data.command != null && data.command === 'shutdown') return null;
  return ({ ...data, a: getRandomNumber(MIN, MAX) });
};
