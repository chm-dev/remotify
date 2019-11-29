/**
 * Process helper module. Interacts with Spotify process
 * @module helpers/procManager
 */

'use strict';
const {spawn} = require('child_process');

const config = require('config');
const find = require('find-process');

const appData = process.env.appData;
const {spotifyProcessName, spotifyDebugArgument, spotifyPathRelative} = config;

// FIXME: Change order of status checks. In case of running in debugMode running
// status doesnt need to be checked anymore.

/**
 * Check if spotify process is running and if it is in debug mode.
 * @param  {string} name=config.spotifyProcessName
 * @returns {Promise<Object}> object {isRunning: <bool>, isDebug <bool>}
 */
exports.runningStatus = function (name = config.spotifyProcessName) {
  return new Promise((resolve, reject) => {
    let isRunning = false;
    let debugMode = false;
    find('name', name + '.exe')
      .then(list => {
        if (list.length > 0) 
          isRunning = true;
        return isRunning;
      }, err => reject(err))
      .then(runningFlag => {
        return find('name', name + `\.exe.*${spotifyDebugArgument}`);
      })
      .then(list => {
        if (list.length > 0) 
          debugMode = true;
        return debugMode;
      }, err => reject(err))
      .then(debugFlag => resolve({isRunning: isRunning, debugMode: debugMode}));
  });
};

/**
 * Restarts or starts spotify process in debug mode
 * @param  {string} name=config.spotifyProcessName
 * @return {Promise<boolean>}
 */
exports.restartInDebugMode = (name = config.spotifyProcessName) => {
  return new Promise((resolve, reject) => {
    find('name', name + '.exe').then(async list => {
      if (list.length > 0) {
        for await(const el of list) {
            process.kill(el.pid);
          }
        }
        const spotifyProcess = spawn(appData + spotifyPathRelative, [' --' + spotifyDebugArgument], {
          detached : true,
          stdio: 'ignore'
        }
      );
      const checkStatus = await exports.runningStatus(spotifyProcessName);
      if (checkStatus.debugMode === true) {
        resolve(true);
      } else {
        reject('Could not start spotify process.');
      }
    });
  });
};
