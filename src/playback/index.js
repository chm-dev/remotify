'use strict';
const config = require('config');
const errors = require('../errors');

// TODO: Input.dispatchKeyEvent({ type: 'keyDown', windowsVirtualKeyCode: 32 })
exports.togglePlay = (req, res, next) => {
  res('Jeszcze momencik :)');
};

exports.buggyRoute = (req, res, next) => {
  // Simulate a custom error
  next(errors.newHttpError(400, 'bad request'));
};
