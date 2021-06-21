const express = require('express');

const router = express.Router();
const models = require('../models');

//
// View all Questionnaires
//
router.get('/', (req, res) => {
  models.Questionnaire.findAll().then((records) => {
    res.render('questionnaire/index', {
      records,
    });
  });
});

//
// Create a new Questionniare
//
router.get('/new', (req, res) => {
  res.render('questionnaire/new');
});

router.post('/', (req, res) => {
  models.Questionnaire.create({
    title: req.body.title,
    explanation: req.body.explanation,
  }).then(() => {
    // when a new one has been created redirect
    // to the all questionnaire page
    res.redirect(`/questionnaire`);
  });
});

//
// Edit a task
//
router.get('/:id/edit', (req, res) => {
  models.Questionnaire.findByPk(req.params.id).then((record) => {
    res.render('questionnaire/edit', {
      record,
    });
  });
});

router.post('/:id/', (req, res) => {
  models.Questionnaire.findByPk(req.params.id).then((record) => {
    record
      .update({
        title: req.body.title,
        explanation: req.body.explanation,
      })
      .then(() => {
        res.redirect(`/questionnaire`);
      });
  });
});

//
// Deleting a post
//
router.get('/:id/delete', (req, res) => {
  models.Questionnaire.findByPk(req.params.id).then((record) => {
    res.render('questionnaire/delete', {
      record,
    });
  });
});

router.post('/:id/delete', (req, res) => {
  models.Questionnaire.findByPk(req.params.id).then((record) => {
    record.destroy().then(() => {
      res.redirect('/questionnaire');
    });
  });
});

//
// Show a questionnaire and its question
//
router.get('/:id/', (req, res) => {
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
router.get('/:id/info', (req, res) => {
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
