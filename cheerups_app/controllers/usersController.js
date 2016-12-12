var express = require('express');
var router = express.Router();

// models
var User = require('../models/users.js');
var Cheerup = require('../models/cheerups.js');

// index route - show all users
router.get('/', function(req, res) {
  User.find({}, function(err, foundUsers) {
    res.render('users/index.ejs', {
      allUsers: foundUsers
    });
  });
});

// create route
router.post('/', function(req, res) {
  User.create(req.body, function(err, createdUser) {
    res.redirect('/users');
  });
});

// new route
router.get('/new', function(req, res) {
  res.render('users/new.ejs');
});

// edit route
router.get('/:id/edit', function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    res.render('users/edit.ejs', {
      user: foundUser
    });
  });
});

// show route
router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    res.render('users/show.ejs', {
      user: foundUser
    });
  });
});

// update route
router.put('/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, foundUser) {
    res.redirect('/users/'+req.params.id);
  });
});

// delete route
router.delete('/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, foundUser) {
    res.redirect('/users');
  });
});

module.exports = router;
