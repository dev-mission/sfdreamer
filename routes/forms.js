const express = require('express');

const router = express.Router();
const models = require('../models');
const helpers = require('./helpers');

router.get('/', (req, res, next) => {
  models.Form.findAll().then((records) => {
    console.log(records);
    res.render('forms/index', {
      records,
    });
  });
});

router.post('/', (req, res, next) => {
  models.Form.create({
    name: req.body.name,
    year: req.body.year,
    school: req.body.school,
    url: req.body.url,
    lang: req.body.lang,
  }).then((record) => {
    res.redirect('/forms');
  });
});

router.get('/new', (req, res, next) => {
  res.render('forms/new', {});
});

router.get('/forms', (req, res, next) => {
  console.log(req.body);
  res.render('index', {
    title: req.body.title,
    body: req.body.body,
  });
});

router.get('/:id', (req, res, next) => {
  console.log(req.params.id);
  models.Form.findByPk(req.params.id).then((record) => {
    res.render('forms/edit', {
      record,
    });
  });
});

router.post('/:id', (req, res, next) => {
  models.Form.findByPk(req.params.id).then((record) => {
    helpers.handleUpload(record, 'logo', req.body.logo, 'forms/logo').then((record) => {
      record
        .update({
          name: req.body.name,
          logo: record.logo,
          year: req.body.year,
          school: req.body.school,
          url: req.body.url,
          lang: req.body.lang,
        })
        .then((record) => {
          res.redirect('/forms');
        });
    });
  });
});

module.exports = router;
