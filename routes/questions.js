const express = require('express');

const router = express.Router();
const models = require('../models');

//
// View all Questions
//
router.get('/', (req, res, next) => {
  models.Question.findAll().then((records) => {
    res.render('question/index', {
      records,
    });
  });
});

//
// Create a new Question
//
router.get('/new', (req, res, next) => {
  models.Questionnaire.findAll().then((records) => {
    res.render('question/new', {
      records,
    });
  });
});

router.post('/', (req, res, next) => {
  models.Question.create({
    prompt: req.body.prompt,
    answer_type: req.body.answer_type,
    questionnaire_type: req.body.questionnaire_type,
    step: req.body.step,
    QuestionnaireId: req.body.QuestionnaireId,
  }).then((record) => {
    // when a new one has been created redirect
    // to the all questionnaire page
    res.redirect(`/questions`);
  });
});

//
// Edit a Question
//
router.get('/:id/edit', (req, res, next) => {
  models.Questionnaire.findAll().then((questionnaires) => {
    models.Question.findByPk(req.params.id).then((record) => {
      res.render('question/edit', {
        record,
        questionnaires,
      });
    });
  });
});

router.post('/:id/edit', (req, res, next) => {
  models.Question.findByPk(req.params.id).then((record) => {
    record
      .update({
        prompt: req.body.prompt,
        answer_type: req.body.answer_type,
        questionnaire_type: req.body.questionnaire_type,
        step: req.body.step,
        QuestionnaireId: req.body.QuestionnaireId,
      })
      .then((record) => {
        res.redirect(`/questions`);
      });
  });
});

//
// Delete a Question
//
router.get('/:id/delete', (req, res, next) => {
  models.Question.findByPk(req.params.id).then((record) => {
    res.render('question/delete', {
      record,
    });
  });
});

router.post('/:id/delete', (req, res, next) => {
  models.Question.findByPk(req.params.id).then((record) => {
    record.destroy().then((record) => {
      res.redirect('/questions');
    });
  });
});

//
// Show a single question
//
router.get('/:id/', (req, res, next) => {
  models.Questionnaire.findAll().then((questionnaires) => {
    models.Answer.findAll().then((answers) => {
      models.Question.findByPk(req.params.id).then((question) => {
        res.render('question/show', {
          question,
          questionnaires,
          answers,
        });
      });
    });
  });
});

router.post('/:id/', (req, res, next) => {
  models.Questionnaire.findAll().then((questionnaires) => {
    models.Answer.findAll().then((answers) => {
      models.Question.findByPk(req.params.id).then((question) => {
        res.render('question/show', {
          question,
          questionnaires,
          answers,
        });
      });
    });
  });
});

module.exports = router;
