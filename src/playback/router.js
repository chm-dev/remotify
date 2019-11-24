'use strict';

// Router
const router = require('express').Router();
const playback = require('./index');

router.get('/togglePlay', playback.togglePlay);
router.post('/', playback.buggyRoute); // Export the router
module.exports = router;
