'use strict';

// Router
const router = require('express').Router();
const proc = require('./index');

// Tasks
router.get('/status', proc.status);
router.get('/reload', proc.reload);
router.get('/', proc.buggyRoute);

// Export the router
module.exports = router;
