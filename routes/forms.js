'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
  models.Form.findAll().then(function(records) {
    res.render('forms/index', {
      records: records
    });
  });
});

router.get('/form-page', function(req, res, next) {
  res.render('index', {
    title: req.body.title,
    body:req.body.body
  });
});

router.post('/', function(req, res, next) {
  models.Form.create({
    name: req.body.title,
    year:req.body.body,
    school:req.body.body,
    url:req.body.body,
    lang:req.body.body,
  }).then(function(record){
    res.redirect('/forms', {

    });
  });
});

router.get('/new', function(req,res,next){
  res.render('forms/new', {

  });
});

router.get('/:id', function(req, res, next) {
  models.Form.findByPk(req.params.id).then(function(record) {
    res.render('/forms/edit');
  });
});

router.post('/:id', function(req, res, next) {
  models.Form.findByPk(req.params.id).then(function(record) {
    record.update({
      title: req.body.title,
      body: req.body.body
    }).then(function(record) {
      res.redirect('/forms');
    })
  })
});

module.exports = router;
