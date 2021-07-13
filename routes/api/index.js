const express = require('express');

const router = express.Router();

router.use('/assets', require('./assets'));
router.use('/auth', require('./auth'));
router.use('/passwords', require('./passwords'));
router.use('/resources', require('./resources'));
router.use('/questionnaire', require('./questionnaire'));
router.use('/users', require('./users'));
router.use('/forms', require('./forms'));

module.exports = router;
