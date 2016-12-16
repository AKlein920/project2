var express = require('express');
var moment = require('moment');
var router = express.Router();

// models
var User = require('../models/users.js');
var Cheerup = require('../models/cheerups.js');

// index route - show all users
router.get('/', function(req, res) {
  User.aggregate({$sort: {username: 1}}, function(err, foundUsers) {
    res.render('users/index.ejs', {
      allUsers: foundUsers,
      currentUser: req.session.currentuser
    });
  });
});

// create route
router.post('/', function(req, res) {
  User.create(req.body, function(err, createdUser) {
    res.redirect('/sessions/new');
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
      user: foundUser,
      currentUser: req.session.currentuser
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
router.delete('/:userId', function(req, res) {
  User.findByIdAndRemove(req.params.userId, function(err, foundUser) {
    Cheerup.collection.remove({'userId':req.params.userId}, function(err, foundCheerups) {
      req.session.destroy();
      res.redirect('/cheerups');
    });
  });
});

// show route
router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    res.render('users/show.ejs', {
      user: foundUser,
      currentUser: req.session.currentuser,
      moment: moment
    });
  });
});

module.exports = router;
