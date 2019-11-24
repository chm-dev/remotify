'use strict';
const path = require('path')

const express = require('express');
const router = require('express').Router();
const middleware = require('./src/middleware');
const errors = require('./src/errors');
const healthRouter = require('./src/health/router');
const taskRouter = require('./src/tasks/router');
const procRouter = require('./src/proc/router');
const playbackRouter = require('./src/playback/router');
// Wire up middleware
router.use(middleware.doSomethingInteresting);

// Wire up routers
router.use('/health', healthRouter);
router.use('/tasks', taskRouter);
router.use('/proc', procRouter);
router.use('/playback', playbackRouter);

// Wire up error-handling middleware
router.use(errors.errorHandler);
router.use(errors.nullRoute);

express().use('/debug-ui', express.static(path.join(__dirname, 'debug','ui')));


// Export the router
module.exports = router;
