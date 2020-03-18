'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const helpers = require('./helpers');

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
    orgtype: req.body.orgtype,
    contactperson: req.body.contactperson,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    website: req.body.website
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

router.post('/:id/delete', function(req, res, next){
  models.Resource.findByPk(req.params.id).then(function(record){
    record.destroy().then(function() {
      res.redirect(`/resources`);
    });
  });
});

router.post('/:id', function( req, res, next){
  models.Resource.findByPk(req.params.id).then(function(record) {
    helpers.handleUpload(record, 'logo', req.body.logo, 'resources/logo').then(function(record) {
      record.update({
        name: req.body.name,
        logo: record.logo,
        orgtype: req.body.orgtype,
        contactperson: req.body.contactperson,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        website: req.body.website
      }).then(function(record) {
        res.redirect('/resources')
      })
    });
  })
});

module.exports = router;
