'use strict';
const config = require('config');
const errors = require('../errors');
const procManager = require('./procManager');

const spotifyProcessName = config.spotifyProcessName;

exports.status = (req, res, next) => {
  // Simulate task list, normally this would be retrieved from a database
  procManager
    .runningStatus(spotifyProcessName)
    .then(status => {
      console.log(status);
      res
        .status(200)
        .json(status);
    });
};

exports.reload = (req, res, next) => {
  procManager
    .restartInDebugMode(spotifyProcessName)
    .then(result => res.status(200)
      .json(result));
};

exports.buggyRoute = (req, res, next) => {
  // Simulate a custom error
  next(errors.newHttpError(400, 'bad request'));
};
