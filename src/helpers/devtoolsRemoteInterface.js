/**
 * Module which inititates and holds connection to spotify's devtools
 */
const config = require('config');
const {spotifyDebugHost, spotifyDebugPort, devtoolsConfig} = config;

const CDP = require('chrome-remote-interface');

/**
 * class for devTools protocol
 */
class DevtoolsRemote {
  /**
   * @constructor
   * @param  {string} [host=spotifyDebugHost] - Spotify Host defaults to config value
   * @param  {string} [port=spotifyDebugPort] - Spotify devtools Port defaults to config value
   */
  constructor(host = spotifyDebugHost, port = spotifyDebugPort) {
    this._host = host;
    this._port = port;
    this.client = null;
  }

  /**
   *
   * Devtools conection init.
   * Inits devtools connection and binds it to this.client. Returns true on sucess
   * @async
   * @returns {boolean} true on success
   * @memberof DevtoolsRemote
   */
  async initClient() {
    this.client = await CDP({host: this._host, port: this._port});
    return true;
  }

  /**
   *
   * Enables certain domain in devtools
   * @param {*} domain
   * @returns bool
   * @memberof DevtoolsRemote
   */
  async enable(domain) {
    if (this.availableDomains.includes(domain) && typeof this.client === 'object') {
      await this
        .client[domain]
        .enable();
      return true;
    } else 
      return false;
    }
  
  /**
   * Returns array with all devtools domains available.
   *  {@link https://chromedevtools.github.io/devtools-protocol/|More info.}
   * @returns {Array<String>}
   */
  get availableDomains() {
    return devtoolsConfig.availableDomains;
  }
}

module.exports = DevtoolsRemote;

/** TESTS ... GONNA REMOVE IT SOON **/
/* (async _ => {
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
 */
