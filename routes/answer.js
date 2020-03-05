'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');


// 
// View all Answers
// 
router.get('/', function(req, res, next) {
    models.Answer.findAll().then(function(records){
        res.render('answer/index', {
        records: records
        });
      });
  });
  

// 
// Create a new Answer
// 
router.get('/new', function(req, res, next) {
  models.Question.findAll().then(function(records){
    res.render('answer/new', {
      records: records
    });
  });
});


  router.post('/', function(req, res, next) {
    models.Answer.create({
      value: req.body.value,
      next_question: req.body.next_question,
      QuestionId: req.body.QuestionId,
    }).then(function(record){
      // when a new one has been created redirect 
      // to the all questionnaire page
      res.redirect(`/answer`); 
    });
  });
  



// 
// Edit a Answer
// 
router.get('/:id', function(req, res, next){
  models.Question.findAll().then(function(questions){
    models.Answer.findByPk(req.params.id).then(function(record) {
      res.render('answer/edit', {
        record: record,
        questions: questions
      });
    });
  });
});


router.post('/:id', function(req, res, next) {
  models.Answer.findByPk(req.params.id).then(function(record) {
    record.update({
      value: req.body.value,
      next_question: req.body.next_question,
      QuestionId: req.body.QuestionId,
    }).then(function(record){
      res.redirect(`/answer`)
    });
  });
});


// 
// Deleting a Answer
// 
router.get('/:id/delete', function(req, res, next){
  models.Answer.findByPk(req.params.id).then(function(record) {
    res.render('answer/delete', {
        record: record
    });
  });
});


router.post('/:id/delete', function(req, res, next) {
  models.Answer.findByPk(req.params.id).then(function(record) {
    record.destroy().then(function(record){
      res.redirect('/answer')
    });
  });
});







module.exports = router;