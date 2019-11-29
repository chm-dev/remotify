'use strict';
const { spawn } = require('child_process');
const nodemon = require('nodemon');
const config = require('config');

const {
  mode,
  nodeDebugHost,
  nodeDebugPort,
  autoOpenPanel,
  devChromePath,
  devChromeFile
} = config.get('debug');
const { apiHost, apiPort } = config;

const DevtoolsConnector = require('../src/helpers/devtoolsConnector');
const devtoolsRemoteInterface = require('../src/helpers/devtoolsRemoteInterface');

if (!mode) {
  console.log(
    '\x1b[31m%s\x1b[0m',
    'Debug mode has to be set to true in config.debug.mode.'
  );

  process.exit(0);
}

let feURL;
console.log(`nodemon(--inspect=${nodeDebugHost}:${nodeDebugPort} server.js)`);
nodemon(`--inspect=${nodeDebugHost}:${nodeDebugPort} server.js`)
  .on('quit', () => {
    console.log('App has quit');
    process.exit();
  })
  .on('restart', files => {
    console.log('App restarted due to: ', files);
  })
  .on('error', err => {
    console.error(err);
  })
  .on('start', async _ => {
    console.log(_);
    console.log('App has started');

    const nodeDevtools = new DevtoolsConnector(nodeDebugHost, nodeDebugPort);

    const feURL = JSON.parse(await nodeDevtools.getFrontendURL())[0]
      .devtoolsFrontendUrl;
    if (autoOpenPanel)
      spawn(
        devChromePath + devChromeFile,
        [`--app=http://${apiHost}:${apiPort}/debug-ui?devtools=${feURL}`],
        {
          detached: true,
          stdio: 'ignore'
        }
      );
  });
