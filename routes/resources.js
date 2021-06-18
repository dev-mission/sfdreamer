const express = require('express');

const router = express.Router();
const models = require('../models');
const helpers = require('./helpers');

router.get('/', (req, res, next) => {
  models.Resource.findAll().then((records) => {
    res.render('resources/index', {
      records,
    });
  });
});

router.get('/new', (req, res, next) => {
  res.render('resources/new');
});

router.post('/', (req, res, next) => {
  models.Resource.create({
    name: req.body.name,
    orgtype: req.body.orgtype,
    contactperson: req.body.contactperson,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    website: req.body.website,
  }).then((record) => {
    res.redirect(`/resources`);
  });
});

router.get('/:id', (req, res, next) => {
  models.Resource.findByPk(req.params.id).then((record) => {
    res.render('resources/edit', {
      record,
    });
  });
});

router.post('/:id/delete', (req, res, next) => {
  models.Resource.findByPk(req.params.id).then((record) => {
    record.destroy().then(() => {
      res.redirect(`/resources`);
    });
  });
});

router.post('/:id', (req, res, next) => {
  models.Resource.findByPk(req.params.id).then((record) => {
    helpers.handleUpload(record, 'logo', req.body.logo, 'resources/logo').then((record) => {
      record
        .update({
          name: req.body.name,
          logo: record.logo,
          orgtype: req.body.orgtype,
          contactperson: req.body.contactperson,
          phone: req.body.phone,
          address: req.body.address,
          email: req.body.email,
          website: req.body.website,
        })
        .then((record) => {
          res.redirect('/resources');
        });
    });
  });
});

module.exports = router;
