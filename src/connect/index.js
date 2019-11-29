const config = require('config');
const procManager = require('../helpers/procManager');
const DevtoolsRemote = require('../helpers/devtoolsRemoteInterface');

('use strict');

exports.status = (req, res, next) => {
  res
    .status(200)
    .json({status: 'UP'});
};
/**
 * Initiates devTools connection with spotify
 * Updates express local variable cdp
 * @async
 */
exports.init = (req, res, next) => {
  procManager
    .runningStatus()
    .then(result => {
      if (result.debugMode) {
        const cdp = new DevtoolsRemote();
        cdp
          .initClient()
          .then(result => {
            if (result) {
              req.app.locals.cdp = cdp;
              res.sendStatus(201);
            } else 
              res
                .status(500)
                .send('Can\'t establish connection with spotify devtools');
            }
          );
      } else 
        res
          .status(400)
          .send(
            'Spotify process is not in debug mode. Use /proc/reload to start/restart the pr' +
            'ocess.'
          );
      }
    );
};
