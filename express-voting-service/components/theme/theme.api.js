'use strict';

const createRouting = require('express').Router;
const controllers = require('./theme.controllers');
const api = createRouting();
module.exports = api;

const OK_CODE = 200;
const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const MIN_STRING_LENGTH = 1;
const MAX_STRING_LENGTH = 1024;

/**
 * @api {post} /themes Create new voting theme
 * @apiName createVotingTheme
 * @apiGroup VotingThemes
 * @apiVersion 1.0.0
 * @apiParam {String{..1024}} name name of the voting theme
 * @apiParamExample {json} Request-Example:
 *    { "name": "test" }
 * @apiSuccess {Number} status=201 HTTP status code
 * @apiSuccess {String} error=null error message
 * @apiSuccess {String} themeId voting theme identifier
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "status": "201",
 *      "error": null,
 *      "themeId": "faefb673-9c9f-48c5-972f-ef440de33542"
 *    }
 */
api.post('/', async (req, res, next) => {
  const name = req.body.name;

  if (name == null) return void res.status(BAD_REQUEST_CODE).json({
    status: BAD_REQUEST_CODE,
    error: 'Name field is missing or equals null',
  });

  if (name.constructor !== String) {
    return void res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_CODE,
      error: 'Name field must be a type of string',
    });
  }

  if (name.length < MIN_STRING_LENGTH || name.length > MAX_STRING_LENGTH) {
    return void res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_CODE,
      error: `Name length cannot be greater than ${MAX_STRING_LENGTH}`,
    });
  }

  try {
    const themeId = await controllers.createTheme(name);
    return void res.status(CREATED_CODE).json({
      status: CREATED_CODE,
      error: null,
      themeId: themeId,
    });
  } catch (err) {
    return void next(err);
  }
});

/**
 * @api {get} /themes/:id Get voting theme information
 * @apiName getVotingTheme
 * @apiGroup VotingThemes
 * @apiVersion 1.0.0
 * @apiParam {String} id voting theme unique identifier
 * @apiSuccess {Number} status=200 HTTP status code
 * @apiSuccess {String} error=null error message
 * @apiSuccess {Object} theme voting theme information
 * @apiSuccess {String} theme.name voting theme name
 * @apiSuccess {Number{0..}} theme.yes voting theme `yes` answers counter
 * @apiSuccess {Number{0..}} theme.no voting theme `no` answers counter
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "200",
 *      "error": null,
 *      "theme": {
 *        "name": "test",
 *        "yes": 10,
 *        "no": 0
 *      }
 *    }
 */
api.get('/:id', async (req, res, next) => {
  const themeId = req.params.id;
  try {
    const theme = await controllers.getTheme(themeId);
    return void res.status(OK_CODE).json({
      status: OK_CODE,
      error: null,
      theme: theme,
    });
  } catch (err) {
    return void next(err);
  }
});

/**
 * @api {post} /themes/:id/:answer Vote `yes` or `no` for a specific theme
 * @apiName answerVotingTheme
 * @apiGroup VotingThemes
 * @apiVersion 1.0.0
 * @apiParam {String} id voting theme identifier
 * @apiParam {String="yes","no"} answer voting theme answer
 * @apiSuccess {Number} status=200 HTTP status code
 * @apiSuccess {String} error=null error message
 * @apiSuccess {String} message="OK" success message
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "200",
 *      "error": null,
 *      "message": "OK"
 *    }
 */
api.post('/:id/:answer', async (req, res, next) => {
  const themeId = req.params.id;
  const answer = req.params.answer.toLowerCase();

  if (['yes', 'no'].indexOf(answer) === -1) {
    return void res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_CODE,
      error: 'Only "yes" and "no" votes are allowed',
    });
  }

  try {
    const result = await controllers.themeVote(themeId, answer);
    return void res.status(OK_CODE).json({
      status: OK_CODE,
      error: null,
      message: result,
    });
  } catch (err) {
    return void next(err);
  }
});
