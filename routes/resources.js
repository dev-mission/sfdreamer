'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next){
  models.Resource.findAll().then(function(records){
    res.render('resources/index',{
      records: records
    });
  });
});

router.get('/new', function(req, res, next){
  res.render('resources/new');
});

router.post('/', function(req, res, next){
  models.Resource.create({
    name: req.body.name,
    phone: req.body.phone
  }).then(function(record){
    res.redirect(`/resources`);
  });
});

router.get('/:id', function(req, res, next){
  models.Resource.findByPk(req.params.id).then(function(record){
    res.render('resources/edit',{
  record: record
   });
  });
});

router.post('/:id', function( req, res, next){
  models.Resource.findBYPk(req.params.id).then(function(record) {
    record.update({
      title: req.body.title,
      body: req.body.body
    }).then(function(record) {
      res.redirect('/resources');
    })
  })
});

module.exports = router;
