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
  res.render('question/new');
});


router.post('/', function(req, res, next) {
  models.Question.create({
    prompt: req.body.prompt,
  }).then(function(record){
    // when a new one has been created redirect 
    // to the all questionnaire page
    res.redirect(`/questions`); 
  });
});
  



// 
// Edit a task
// 
router.get('/:id', function(req, res, next){
  models.Question.findByPk(req.params.id).then(function(record) {
    res.render('question/edit', {
      record: record
    });
  });
});


router.post('/:id', function(req, res, next) {
  models.Question.findByPk(req.params.id).then(function(record) {
    record.update({
      prompt: req.body.prompt,
      // explanation: req.body.explanation,
    }).then(function(record){
      res.redirect(`/questions`)
    });
  });
});


// 
// Deleting a post
// 
router.get('/delete/:id', function(req, res, next){
  models.Question.findByPk(req.params.id).then(function(record) {
    res.render('questions/delete', {
        record: record
    });
  });
});


router.post('/delete/:id', function(req, res, next) {
  models.Question.findByPk(req.params.id).then(function(record) {
    record.destroy().then(function(record){
      res.redirect('/')
    });
  });
});






module.exports = router;