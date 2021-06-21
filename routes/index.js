const express = require('express');
const path = require('path');

const router = express.Router();

/// configure serving up a built client app
router.use(express.static(path.join(__dirname, '../client/build')));

/// configure serving any static file in public folder
router.use(express.static(path.join(__dirname, '../public')));

/// serve libraries installed as node modules
router.use('/libraries/bootstrap', express.static(path.join(__dirname, '../client/node_modules/bootstrap/dist')));
router.use('/libraries/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

/// serve some paths from other nested routers
router.use('/api', require('./api'));

router.use('/questionnaire', require('./questionnaire'));
router.use('/questions', require('./questions'));
router.use('/answer', require('./answer'));
router.use('/resources', require('./resources'));
router.use('/forms', require('./forms'));

router.get('/', (req, res) => {
  res.render('index');
});

/// serve up the client app for all other routes, per SPA client-side routing
router.get('/*', (req, res, next) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  } else {
    next();
  }
});

module.exports = router;
