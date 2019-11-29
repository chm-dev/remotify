'use strict';

// Router
const router = require('express').Router();
const playback = require('./index');
const DevtoolsRemote = require('../helpers/devtoolsRemoteInterface');

// Middleware to make sure that our connection to devtools is still up.
router.use(async (req, res, next) => {
  if (typeof req.app.locals.cdp !== 'object') {
    try {
      const cdp = new DevtoolsRemote();
      await cdp.initClient();
      req.app.locals.cdp = cdp;
    } catch (e) {
      console.log(e, typeof e);
      e.message.match(/ECONNREFUSED/i)
        ? res.status(400).send('Can"t connect to Spotify devtools')
        : res.status(500).send(e);
      return;
    }
  }
  next();
});

for (const action of Object.keys(playback)) {
  router.get(`/${action}`, playback[action]);
}

// router.post('/', playback.buggyRoute);  Export the router
module.exports = router;
