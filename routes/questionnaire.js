const express = require('express');

const router = express.Router();
const models = require('../models');

//
// View all Questionnaires
//
router.get('/', (req, res, next) => {
  models.Questionnaire.findAll().then((records) => {
    res.render('questionnaire/index', {
      records,
    });
  });
});

//
// Create a new Questionniare
//
router.get('/new', (req, res, next) => {
  res.render('questionnaire/new');
});

router.post('/', (req, res, next) => {
  models.Questionnaire.create({
    title: req.body.title,
    explanation: req.body.explanation,
  }).then((record) => {
    // when a new one has been created redirect
    // to the all questionnaire page
    res.redirect(`/questionnaire`);
  });
});

//
// Edit a task
//
router.get('/:id/edit', (req, res, next) => {
  models.Questionnaire.findByPk(req.params.id).then((record) => {
    res.render('questionnaire/edit', {
      record,
    });
  });
});

router.post('/:id/', (req, res, next) => {
  models.Questionnaire.findByPk(req.params.id).then((record) => {
    record
      .update({
        title: req.body.title,
        explanation: req.body.explanation,
      })
      .then((record) => {
        res.redirect(`/questionnaire`);
      });
  });
});

//
// Deleting a post
//
router.get('/:id/delete', (req, res, next) => {
  models.Questionnaire.findByPk(req.params.id).then((record) => {
    res.render('questionnaire/delete', {
      record,
    });
  });
});

router.post('/:id/delete', (req, res, next) => {
  models.Questionnaire.findByPk(req.params.id).then((record) => {
    record.destroy().then((record) => {
      res.redirect('/questionnaire');
    });
  });
});

//
// Show a questionnaire and its question
//
router.get('/:id/', (req, res, next) => {
  models.Questionnaire.findByPk(req.params.id).then((questionnaire) => {
    models.Question.findAll().then((questions) => {
      res.render('questionnaire/show', {
        questions,
        questionnaire,
      });
    });
  });
});

//
// Show info about
//
router.get('/:id/info', (req, res, next) => {
  models.Questionnaire.findByPk(req.params.id).then((questionnaire) => {
    models.Question.findAll().then((questions) => {
      res.render('questionnaire/info', {
        questions,
        questionnaire,
      });
    });
  });
});

module.exports = router;
