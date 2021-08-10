const express = require('express');

const router = express.Router();

router.use('/answers', require('./answers'));
router.use('/assets', require('./assets'));
router.use('/auth', require('./auth'));
router.use('/categories', require('./categories'));
router.use('/forms', require('./forms'));
router.use('/passwords', require('./passwords'));
router.use('/resources', require('./resources'));
router.use('/questions', require('./questions'));
router.use('/questionnaires', require('./questionnaires'));
router.use('/users', require('./users'));

module.exports = router;
