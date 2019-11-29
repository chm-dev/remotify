'use strict';
const config = require('config');
const errors = require('../errors');
const DevtoolsRemote = require('../helpers/devtoolsRemoteInterface');

const sendKeyEvent = async (req, params) => {
  const { Input } = req.app.locals.cdp.client;
  try {
    await Input.dispatchKeyEvent(params);
    return true;
  } catch (e) {
    return {
      error: e
    };
  }
};

/**
 * togglePlay - play / pause function
  @async
 */
exports.togglePlay = (req, res, next) =>
  sendKeyEvent(req, {
    type: 'keyDown',
    windowsVirtualKeyCode: 32
  }).then(
    result =>
      result === true ? res.sendStatus(200) : res.status(500).send(result)
  );

exports.nextSong = (req, res, next) =>
  sendKeyEvent(req, {
    type: 'keyDown',
    modifiers: 2,
    windowsVirtualKeyCode: 39
  }).then(
    result =>
      result === true ? res.sendStatus(200) : res.status(500).send(result)
  );

exports.buggyRoute = (req, res, next) => {
  // Simulate a custom error
  next(errors.newHttpError(400, 'bad request'));
};
