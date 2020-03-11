'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');


// 
// View all Questions
// 
router.get('/', function(req, res, next) {
    models.Question.findAll().then(function(records){
        res.render('question/index', {
        records: records
        });
      });
  });
  

// 
// Create a new Question
// 
router.get('/new', function(req, res, next) {
  models.Questionnaire.findAll().then(function(records){
    res.render('question/new', {
    records: records
    });
  });
});



router.post('/', function(req, res, next) {
  models.Question.create({
    prompt: req.body.prompt,
    answer_type: req.body.answer_type,
    questionnaire_type: req.body.questionnaire_type,
    step: req.body.step,
    QuestionnaireId: req.body.QuestionnaireId,
  }).then(function(record){
    // when a new one has been created redirect 
    // to the all questionnaire page
    res.redirect(`/questions`); 
  });
});
  



// 
// Edit a Question
// 
router.get('/:id', function(req, res, next){
  models.Questionnaire.findAll().then(function(questionnaires){
    models.Question.findByPk(req.params.id).then(function(record) {
      res.render('question/edit', {
        record: record,
        questionnaires: questionnaires
      });
    });
  });
});


router.post('/:id', function(req, res, next) {
  models.Question.findByPk(req.params.id).then(function(record) {
    record.update({
      prompt: req.body.prompt,
      answer_type: req.body.answer_type,
      questionnaire_type: req.body.questionnaire_type,
      step: req.body.step,
      QuestionnaireId: req.body.QuestionnaireId,
    }).then(function(record){
      res.redirect(`/questions`)
    });
  });
});


// 
// Delete a Question
// 
router.get('/:id/delete', function(req, res, next){
  models.Question.findByPk(req.params.id).then(function(record) {
    res.render('question/delete', {
        record: record
    });
  });
});


router.post('/:id/delete', function(req, res, next) {
  models.Question.findByPk(req.params.id).then(function(record) {
    record.destroy().then(function(record){
      res.redirect('/questions')
    });
  });
});






module.exports = router;