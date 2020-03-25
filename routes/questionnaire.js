'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');


// 
// View all Questionnaires
// 
router.get('/', function(req, res, next) {
    models.Questionnaire.findAll().then(function(records){
        res.render('questionnaire/index', {
        records: records
        });
      });
  });
  

// 
// Create a new Questionniare
// 
router.get('/new', function(req, res, next) {
  res.render('questionnaire/new');
});


  router.post('/', function(req, res, next) {
    models.Questionnaire.create({
      title: req.body.title,
      explanation: req.body.explanation,
    }).then(function(record){
      // when a new one has been created redirect 
      // to the all questionnaire page
      res.redirect(`/questionnaire`); 
    });
  });
  



// 
// Edit a task
// 
router.get('/:id/edit', function(req, res, next){
  models.Questionnaire.findByPk(req.params.id).then(function(record) {
    res.render('questionnaire/edit', {
      record: record
    });
  });
});


router.post('/:id/', function(req, res, next) {
  models.Questionnaire.findByPk(req.params.id).then(function(record) {
    record.update({
      title: req.body.title,
      explanation: req.body.explanation,
    }).then(function(record){
      res.redirect(`/questionnaire`)
    });
  });
});


// 
// Deleting a post
// 
router.get('/:id/delete', function(req, res, next){
  models.Questionnaire.findByPk(req.params.id).then(function(record) {
    res.render('questionnaire/delete', {
        record: record
    });
  });
});


router.post('/:id/delete', function(req, res, next) {
  models.Questionnaire.findByPk(req.params.id).then(function(record) {
    record.destroy().then(function(record){
      res.redirect('/questionnaire')
    });
  });
});




// 
// Show a questionnaire and its question
// 
router.get('/:id/', function(req, res, next){
  models.Questionnaire.findByPk(req.params.id).then(function(questionnaire){
<<<<<<< HEAD
    models.Question.findAll().then(function(questions){
      res.render('questionnaire/show', {
        questions: questions,
=======
    models.Question.findByPk(req.params.id).then(function(question) {
      res.render('questionnaire/show', {
        question: question,
>>>>>>> master
        questionnaire: questionnaire
      });
    });
  });
});


module.exports = router;