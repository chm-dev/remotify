const http = require('http');

const {spotifyDebugHost, spotifyDebugPort} = require('config');

module.exports = class {
  constructor(host = spotifyDebugHost, port = spotifyDebugPort) {
    this.host = host;
    this.port = port;
  }

  getWsURL() {
    request(`http://${this.host}:${this.port}/json`).then(data => {
      return JSON.parse(data)[0].webSocketDebuggerUrl;
    });
  }

  getFrontendURL() {
    return new Promise((resolve, reject) => {
      http.get({
        hostname: this.host,
        port    : this.port,
        path    : '/json/list',
        agent   : false
      }, res => {
        res.setEncoding('UTF-8');
        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
          resolve(chunk);
        });
      });
    });
    /*
    const json = await request(`http://${this.host}:${this.port}/json/list`);
    console.log(json);
    return JSON.parse(json)[0].devtoolsFrontendUrlCompat;
    */
  }
};
