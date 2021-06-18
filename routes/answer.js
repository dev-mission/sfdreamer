const express = require('express');

const router = express.Router();
const models = require('../models');

//
// View all Answers
//
router.get('/', (req, res, next) => {
  models.Answer.findAll().then((records) => {
    res.render('answer/index', {
      records,
    });
  });
});

//
// Create a new Answer
//
router.get('/new', (req, res, next) => {
  models.Question.findAll().then((records) => {
    res.render('answer/new', {
      records,
    });
  });
});

router.post('/', (req, res, next) => {
  models.Answer.create({
    value: req.body.value,
    QuestionId: req.body.QuestionId,
    NextQuestionId: req.body.NextQuestionId,
  }).then((record) => {
    // when a new one has been created redirect
    // to the all questionnaire page
    res.redirect(`/answer`);
  });
});

//
// Edit a Answer
//
router.get('/:id', (req, res, next) => {
  models.Question.findAll().then((questions) => {
    models.Answer.findByPk(req.params.id).then((record) => {
      res.render('answer/edit', {
        record,
        questions,
      });
    });
  });
});

router.post('/:id', (req, res, next) => {
  models.Answer.findByPk(req.params.id).then((record) => {
    record
      .update({
        value: req.body.value,
        QuestionId: req.body.QuestionId,
        NextQuestionId: req.body.NextQuestionId,
      })
      .then((record) => {
        res.redirect(`/answer`);
      });
  });
});

//
// Deleting a Answer
//
router.get('/:id/delete', (req, res, next) => {
  models.Answer.findByPk(req.params.id).then((record) => {
    res.render('answer/delete', {
      record,
    });
  });
});

router.post('/:id/delete', (req, res, next) => {
  models.Answer.findByPk(req.params.id).then((record) => {
    record.destroy().then((record) => {
      res.redirect('/answer');
    });
  });
});

module.exports = router;
