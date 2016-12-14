// set up express Router
var express = require('express');
var moment = require('moment');
var router = express.Router();

// require the models
var Cheerup = require('../models/cheerups.js');
var User = require('../models/users.js');

// all routes

// index route - show all cheerups
router.get('/', function(req, res) {
  Cheerup.find({}, function(err, foundCheerups) {
    User.find({}, function(err, foundUsers) {
      res.render('cheerups/index.ejs', {
        allCheerups: foundCheerups,
        currentUser: req.session.currentuser,
        users: foundUsers
      });
    });
  });
});

// create route
router.post('/', function(req, res) {
  User.findById(req.body.userId, function(err, foundUser) {
    Cheerup.create(req.body, function(err, createdCheerup) {
      foundUser.cheerupPage.push(createdCheerup);
      foundUser.save(function(err, data) {
        res.redirect('/cheerups');
      });
    });
  });
});

// new route
router.get('/new', function(req, res) {
  User.find({}, function(err, allUsers) {
    res.render('cheerups/new.ejs', {
      allUsers: allUsers,
      currentUser: req.session.currentuser
    });
  });
});

// edit route
router.get('/:id/edit', function(req, res) {
  Cheerup.findById(req.params.id, function(err, foundCheerup) {
    User.find({}, function(err, allUsers) {
      res.render('cheerups/edit.ejs', {
        cheerup: foundCheerup,
        allUsers: allUsers
      });
    });
  });
});

// update route
router.put('/:id', function(req, res) {
  Cheerup.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedCheerup) {
    User.findOne({'cheerupPage._id':req.params.id}, function(err, foundUser) {
      foundUser.cheerupPage.id(req.params.id).remove();
      foundUser.cheerupPage.push(updatedCheerup);
      foundUser.save(function(err, data) {
        res.redirect('/cheerups/'+req.params.id);
      });
    });
  });
});

// delete route
router.delete('/:id', function(req, res) {
  Cheerup.findByIdAndRemove(req.params.id, function(err, foundCheerup) {
    User.findOne({'cheerupPage._id':req.params.id}, function(err, foundUser) {
      foundUser.cheerupPage.id(req.params.id).remove();
      foundUser.save(function(err, data) {
        res.redirect('/cheerups');
      });
    });
  });
});

// cheer button route
router.put('/:id/cheer', function(req, res) {
  Cheerup.findByIdAndUpdate(req.params.id, {$inc: {cheers: +1}}, {new: true}, function(err, updatedCheerup) {
    User.findOne({'cheerupPage._id': req.params.id}, function(err, foundUser) {
      foundUser.cheerupPage.id(req.params.id).remove();
      foundUser.cheerupPage.push(updatedCheerup);
      foundUser.save(function(err, data) {
        res.redirect('/cheerups');
      });
    });
  });
});

// show route
router.get('/:id', function(req, res) {
  Cheerup.findById(req.params.id, function(err, foundCheerup) {
    User.findOne({'cheerupPage._id':req.params.id}, function(err, foundUser) {
      res.render('cheerups/show.ejs', {
        cheerup: foundCheerup,
        user: foundUser,
        currentUser: req.session.currentuser,
        moment: moment
      });
    });
  });
});



module.exports = router;
