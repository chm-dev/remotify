const WebSocket = require('ws');

const ws = new WebSocket(
  'ws://localhost:9627/devtools/page/C22ABE04A7077FBCF2F5D1D13824936C'
);
var tosend = {
  id: 2,
  seq: 117,
  type: 'request',
  command: 'evaluate',
  method: 'Runtime.evaluate',
  params: {
    awaitPromise: false,
    contextId: 1,
    expression: 'document.querySelector(\'#player-button-play\').click()',
    generatePreview: true,
    includeCommandLineAPI: true,
    objectGroup: 'console',
    returnByValue: false,
    silent: false,
    userGesture: true
  }
};

ws.on('open', function open() {
  ws.send(JSON.stringify(tosend));
});

ws.on('message', function incoming(data) {
  console.log(data);
});
