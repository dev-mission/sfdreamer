'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');


// 
// view todo tasks
// 
router.get('/', function(req, res, next) {
    models.Questionnaire.findAll().then(function(records){
        res.render('questionnaire/index', {
        records: records
        });
      });
  });
  
// 
// Create New task
// 
router.get('/new', function(req, res, next) {
  res.render('questionnaire/new');
});


  router.post('/', function(req, res, next) {
    models.Todo.create({
      title: req.body.title,
      body: req.body.description,
    }).then(function(record){
      res.redirect(`/questionnaire`);
    });
  });
  



// 
// Edit a task
// 
// router.get('/:id', function(req, res, next){
//   models.Todo.findByPk(req.params.id).then(function(record) {
//     res.render('questionnaire/edit_todo', {
//       record: record
//     });
//   });
// });


// router.post('/:id', function(req, res, next) {
//   models.Todo.findByPk(req.params.id).then(function(record) {
//     record.update({
//       title: req.body.title,
//       body: req.body.body,
//     }).then(function(record){
//       res.redirect(`/questionnaire`)
//     });
//   });
// });


// 
// Deleting a post
// 
// router.get('/delete_todo', function(req, res, next){
//   models.Todo.findByPk(req.query.id).then(function(record) {
//     res.render('delete_post', {
//         record: record
//     });
//   });
// });


// router.post('/delete_todo', function(req, res, next) {
//   models.Todo.findByPk(req.query.id).then(function(record) {
//     record.destroy().then(function(record){
//       res.redirect('/')
//     });
//   });
// });






module.exports = router;