'use strict';

const dal = require('./theme.dal');
const controller = {};
module.exports = controller;

/**
 * Creates new voting theme
 * @memberof module:theme
 * @param {String} name theme name
 * @returns {Promise<String>} theme identifier
 */
controller.createTheme = async (name) => {
  const theme = await dal.createTheme(name);
  return theme.id;
};

/**
 * Gets voting theme information
 * @memberof module:theme
 * @param {String} id theme identifier
 * @returns {Promise<Object>} theme information
 */
controller.getTheme = async (id) => {
  const theme = await dal.findThemeById(id);
  return theme;
};

/**
 * Increments `yes` or `no` voting answers in a theme
 * @memberof module:theme
 * @param {String} id theme identifier
 * @param {String} answer `yes` or `no` vote
 * @returns {Promise<String>} `OK` string
 */
controller.themeVote = async (id, answer) => {
  await dal.themeVote(id, answer);
  return 'OK';
};
