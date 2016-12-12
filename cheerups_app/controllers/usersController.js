var express = require('express');
var router = express.Router();

// models
var User = require('../models/users.js');
var Cheerup = require('../models/cheerups.js');

// index route
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

// show route
router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    res.render('users/show.ejs', {
      user: foundUser
    });
  });
});

module.exports = router;
