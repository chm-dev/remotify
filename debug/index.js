'use strict';
const {spawn} = require('child_process');

const express = require('express');
const request = require('../src/helpers/request');

const app = express();

const nodemon = require('nodemon');
const {nodeDebugHost, nodeDebugPort, devChromePath, devChromeFile} = require(
  'config'
).debug;
const {apiHost, apiPort} = require('config');

const ~~ = require('../src/helpers/devtoolsConnector');

let feURL;

console.log(`--inspect=${nodeDebugHost}:${nodeDebugPort} server.js`);
nodemon(`--inspect=${nodeDebugHost}:${nodeDebugPort} server.js`).on(
  'quit',
  () => {
    console.log('App has quit');
    process.exit();
  }
).on('restart', files => {
  console.log('App restarted due to: ', files);
}).on('error', err => {
  console.error(err);
}).on('start', async _ => {
// FIXME: For some reason  devtools urls are wrong in debug panel. FIX ASAP.

  console.log('App has started');
  const dt = new devtoolsConnector(nodeDebugHost, nodeDebugPort);
  const feURL = encodeURIComponent(
    JSON.parse(await dt.getFrontendURL())[0].devtoolsFrontendUrlCompat
  );
  spawn(
    devChromePath + devChromeFile,
    [` --app=http://${apiHost}:${apiPort}/debug-ui/?devtools=${feURL}`],
    {
      detached: true,
      stdio   : 'ignore'
    }
  );
});
