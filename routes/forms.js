const express = require('express');

const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.Form.findAll().then((records) => {
    console.log(records);
    res.render('forms/index', {
      records,
    });
  });
});

router.post('/', (req, res) => {
  models.Form.create({
    name: req.body.name,
    year: req.body.year,
    school: req.body.school,
    url: req.body.url,
    lang: req.body.lang,
  }).then(() => {
    res.redirect('/forms');
  });
});

router.get('/new', (req, res) => {
  res.render('forms/new', {});
});

router.get('/forms', (req, res) => {
  console.log(req.body);
  res.render('index', {
    title: req.body.title,
    body: req.body.body,
  });
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  models.Form.findByPk(req.params.id).then((record) => {
    res.render('forms/edit', {
      record,
    });
  });
});

router.post('/:id', (req, res) => {
  models.Form.findByPk(req.params.id).then((record) => {
    record
      .update({
        name: req.body.name,
        logo: req.body.logo,
        year: req.body.year,
        school: req.body.school,
        url: req.body.url,
        lang: req.body.lang,
      })
      .then(() => {
        res.redirect('/forms');
      });
  });
});

module.exports = router;
