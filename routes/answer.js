const express = require('express');

const router = express.Router();
const models = require('../models');

//
// View all Answers
//
router.get('/', (req, res) => {
  models.Answer.findAll().then((records) => {
    res.render('answer/index', {
      records,
    });
  });
});

//
// Create a new Answer
//
router.get('/new', (req, res) => {
  models.Question.findAll().then((records) => {
    res.render('answer/new', {
      records,
    });
  });
});

router.post('/', (req, res) => {
  models.Answer.create({
    value: req.body.value,
    QuestionId: req.body.QuestionId,
    NextQuestionId: req.body.NextQuestionId,
  }).then(() => {
    // when a new one has been created redirect
    // to the all questionnaire page
    res.redirect(`/answer`);
  });
});

//
// Edit a Answer
//
router.get('/:id', (req, res) => {
  models.Question.findAll().then((questions) => {
    models.Answer.findByPk(req.params.id).then((record) => {
      res.render('answer/edit', {
        record,
        questions,
      });
    });
  });
});

router.post('/:id', (req, res) => {
  models.Answer.findByPk(req.params.id).then((record) => {
    record
      .update({
        value: req.body.value,
        QuestionId: req.body.QuestionId,
        NextQuestionId: req.body.NextQuestionId,
      })
      .then(() => {
        res.redirect(`/answer`);
      });
  });
});

//
// Deleting a Answer
//
router.get('/:id/delete', (req, res) => {
  models.Answer.findByPk(req.params.id).then((record) => {
    res.render('answer/delete', {
      record,
    });
  });
});

router.post('/:id/delete', (req, res) => {
  models.Answer.findByPk(req.params.id).then((record) => {
    record.destroy().then(() => {
      res.redirect('/answer');
    });
  });
});

module.exports = router;
