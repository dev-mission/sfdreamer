'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/', function(req, res, next) {
  res.render('index');
});

// the about view
router.get('/about', function(req, res, next) {
  res.render('about');
});


router.get('/logout', function(req,res,next){
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('/');
});

module.exports = router;
