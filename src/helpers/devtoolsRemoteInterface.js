const {spotifyDebugHost, spotifyDebugPort} = require('../../config/default.json');
const {devtoolsConfig} = require('../../config/default.json');

const CDP = require('chrome-remote-interface');
const config = require('config');

class DevtoolsRemote {
  constructor(host = spotifyDebugHost, port = spotifyDebugPort) {
    this._host  = host;
    this._port  = port;
    this.client = null;
  }

  async initClient() {
    this.client = await CDP({host: this._host, port: this._port});
    return true;
  }

  async enable(domain) {
    if (this.availableDomains.includes(domain) && typeof this.client === 'object') {
      await this.client[domain].enable();
      return this.client[domain];
    } else 
      return false;
    }
  
  get availableDomains() {
    return devtoolsConfig.availableDomains;
  }
}

module.exports = DevtoolsRemote;

/** TESTS ... GONNA REMOVE IT SOON **/
(async _ => {
  const remote = new DevtoolsRemote();
  console.log(remote);

  const initSuccesful = await remote.initClient();
  initSuccesful;
  console.log(remote.client);

  console.log(remote);
  console.log(Object.keys(remote.client));
  const Page = await remote.enable('Page');
  console.log(Page);
  Page.navigate({url: 'about:blank'});
})();
