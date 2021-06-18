'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const helpers = require('./helpers');

router.get('/', function (req, res, next) {
  models.Form.findAll().then(function (records) {
    console.log(records);
    res.render('forms/index', {
      records: records,
    });
  });
});

router.post('/', function (req, res, next) {
  models.Form.create({
    name: req.body.name,
    year: req.body.year,
    school: req.body.school,
    url: req.body.url,
    lang: req.body.lang,
  }).then(function (record) {
    res.redirect('/forms');
  });
});

router.get('/new', function (req, res, next) {
  res.render('forms/new', {});
});

router.get('/forms', function (req, res, next) {
  console.log(req.body);
  res.render('index', {
    title: req.body.title,
    body: req.body.body,
  });
});

router.get('/:id', function (req, res, next) {
  console.log(req.params.id);
  models.Form.findByPk(req.params.id).then(function (record) {
    res.render('forms/edit', {
      record: record,
    });
  });
});

router.post('/:id', function (req, res, next) {
  models.Form.findByPk(req.params.id).then(function (record) {
    helpers.handleUpload(record, 'logo', req.body.logo, 'forms/logo').then(function (record) {
      record
        .update({
          name: req.body.name,
          logo: record.logo,
          year: req.body.year,
          school: req.body.school,
          url: req.body.url,
          lang: req.body.lang,
        })
        .then(function (record) {
          res.redirect('/forms');
        });
    });
  });
});

module.exports = router;
