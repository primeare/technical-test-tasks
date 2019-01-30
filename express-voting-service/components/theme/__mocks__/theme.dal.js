'use strict';
/* eslint no-mixed-operators: "off", no-magic-numbers: "off" */

const dal = {};
module.exports = dal;

const ri = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const mockedDB = new Map();

dal.createTheme = (name) => {
  const r = [ri(1, 9), ri(1, 9), ri(1, 9), ri(1, 9)];
  const key = `faefb67${r[0]}-9c${r[1]}f-4${r[2]}c5-972f-ef${r[3]}40de33542`;
  const theme = {
    id: key,
    name: name,
    yes: 0,
    no: 0,
  };
  mockedDB.set(key, theme);
  return Promise.resolve(theme);
};

dal.findThemeById = id => Promise.resolve(mockedDB.get(id));

dal.themeVote = (id, answer) => {
  const theme = mockedDB.get(id);
  if (theme != null) theme[answer]++;
  return Promise.resolve(theme);
};
