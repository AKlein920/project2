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
        users: foundUsers,
        currentUser: req.session.currentuser
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

// cheer keyword route
// router.get('/keyword', function(req, res) {
//   Cheerup.find({}, function(err, foundCheerups) {
//     res.send(foundCheerups);
//   });
// });

// most cheered route
router.get('/mostcheered', function(req, res) {
  User.find({}, function(err, foundUsers) {
    Cheerup.aggregate([{$sort: {cheers: -1}}], function(err, sortedFoundCheers) {
      res.render('cheerups/mostcheered.ejs', {
        cheerups: sortedFoundCheers,
        users: foundUsers
      });
    });
  });
});

// inspire me route
router.get('/randomcheerup', function(req, res) {
  Cheerup.count().exec(function(err, count) {
    var random = Math.floor(Math.random()*count);
    Cheerup.findOne().skip(random).exec(function(err, resultCheerup) {
      User.find({}, function(err, foundUsers) {
        res.render('cheerups/inspireme.ejs', {
          randomCheerup: resultCheerup,
          users: foundUsers
        });
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
