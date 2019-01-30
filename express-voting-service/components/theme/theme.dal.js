'use strict';

/**
 * @constant DAL
 * @description Data Access Layer
 * @memberof module:theme
 */
const dal = {};
const models = require('../../lib/db').models;
module.exports = dal;

/**
 * Creates new theme in database table 'themes'
 * @memberof module:theme
 * @param {String} name name of the voting theme
 * @returns {Promise<Object>} created theme
 */
dal.createTheme = name => models.Theme.create({ name });

/**
 * Finds a theme by id in database table 'themes'
 * @memberof module:theme
 * @param {String} id theme identifier
 * @returns {Promise<Object>} found theme
 */
dal.findThemeById = id => models.Theme.findByPk(id, {
  attributes: {
    exclude: ['id', 'createdAt', 'updatedAt', 'version'],
  },
});

/**
 * Increments theme's vote `answer` by 1 using `id` to find theme in database
 * table 'themes'
 * @memberof module:theme
 * @param {String} id theme identifier
 * @param {String} answer `yes` or `no` answer
 * @returns {Promise<Object>} found theme
 */
dal.themeVote = (id, answer) => models.Theme.increment(answer, {
  where: { id },
});
