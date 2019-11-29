'use strict';

// Router
const router = require ('express').Router ();
const connect = require ('./index');

// Health
router.get ('/status', connect.status);
router.get ('/init', connect.init);

// Export the router
module.exports = router;
