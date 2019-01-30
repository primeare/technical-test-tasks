'use strict';
/* eslint no-process-exit: "off", no-magic-numbers: "off" */

const dal = require('./theme.dal');
const controllers = require('./theme.controllers');
jest.unmock('./theme.controllers');

describe('Data Access Layer', () => {
  test('Create Theme', (done) => {
    dal.createTheme('Test').then((theme) => {
      expect(theme).toBeDefined();
      expect(theme.id.constructor).toStrictEqual(String);
      expect(theme.name.constructor).toStrictEqual(String);
      expect(theme.yes.constructor).toStrictEqual(Number);
      expect(theme.no.constructor).toStrictEqual(Number);
      done();
    }).catch((err) => {
      expect(err).toBeFalsy();
    });
  });

  test('Find theme by identifier', async (done) => {
    const testTheme = await dal.createTheme('Test');
    dal.findThemeById(testTheme.id).then((theme) => {
      expect(theme).toBeDefined();
      expect(theme.name).toStrictEqual('Test');
      done();
    }).catch((err) => {
      expect(err).toBeFalsy();
    });
  });

  test('Voting', async (done) => {
    const testTheme = await dal.createTheme('Test');
    await Promise.all([
      dal.themeVote(testTheme.id, 'yes'),
      dal.themeVote(testTheme.id, 'yes'),
      dal.themeVote(testTheme.id, 'yes'),
      dal.themeVote(testTheme.id, 'no'),
    ]);

    expect(testTheme.yes).toStrictEqual(3);
    expect(testTheme.no).toStrictEqual(1);
    done();
  });
});

describe('Controllers', () => {
  test('Create Theme', (done) => {
    controllers.createTheme('Test').then((themeId) => {
      expect(themeId).toBeDefined();
      expect(themeId.constructor).toStrictEqual(String);
      done();
    }).catch((err) => {
      expect(err).toBeFalsy();
    });
  });

  test('Get voting theme', async (done) => {
    const themeId = await controllers.createTheme('Test');
    controllers.getTheme(themeId).then((theme) => {
      expect(theme).toBeDefined();
      expect(theme.name).toStrictEqual('Test');
      expect(theme.yes).toBeDefined();
      expect(theme.no).toBeDefined();
      done();
    }).catch((err) => {
      expect(err).toBeFalsy();
    });
  });

  test('Voting', async (done) => {
    const themeId = await controllers.createTheme('Test');
    await Promise.all([
      controllers.themeVote(themeId, 'yes'),
      controllers.themeVote(themeId, 'yes'),
      controllers.themeVote(themeId, 'yes'),
      controllers.themeVote(themeId, 'no'),
    ]);

    const theme = await controllers.getTheme(themeId);
    expect(theme.yes).toStrictEqual(3);
    expect(theme.no).toStrictEqual(1);
    done();
  });
});
