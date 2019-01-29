'use strict';

const config = require('config');
const request = require('request');
const EXTERNAL_RESOURCE_URL = config.get('business.externalResourceURL');

/**
 * Returns HTTPS Stream from external resource
 * @memberof module:todos-proxy
 * @param {String} [id] identifier for external resource
 * @returns {Object} HTTPS stream
 */
module.exports = (id = '') => {
  if (id.length > 0) return request(EXTERNAL_RESOURCE_URL + '/' + id);
  return request(EXTERNAL_RESOURCE_URL);
};
