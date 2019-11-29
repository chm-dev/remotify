'use strict';
const config = require('config');
const errors = require('../errors');
const procManager = require('../helpers/procManager');

const spotifyProcessName = config.spotifyProcessName;

exports.status = (req, res, next) => {
  procManager
    .runningStatus(spotifyProcessName)
    .then(status => res.status(200).json(status));
};
exports.reload = (req, res, next) => {
  procManager
    .restartInDebugMode(spotifyProcessName)
    .then(result => res.sendStatus(200));
};

exports.buggyRoute = (req, res, next) => {
  // Simulate a custom error
  next(errors.newHttpError(400, 'bad request'));
};
