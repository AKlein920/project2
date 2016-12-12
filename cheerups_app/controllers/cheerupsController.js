// set up express Router
var express = require('express');
var router = express.Router();

// require the models
var Cheerup = require('../models/cheerups.js');

// all routes

// index route - show all cheerups
router.get('/', function(req, res) {
  Cheerup.find({}, function(err, foundCheerups) {
    res.render('cheerups/index.ejs', {
      allCheerups: foundCheerups
    });
  });
});

// create route
router.post('/', function(req, res) {
  Cheerup.create(req.body, function(err, createdCheerup) {
    res.redirect('/cheerups');
  });
});

// new route
router.get('/new', function(req, res) {
  res.render('cheerups/new.ejs');
});

// show route
router.get('/:id', function(req, res) {
  Cheerup.findById(req.params.id, function(err, foundCheerup) {
    res.render('cheerups/show.ejs', {
      cheerup: foundCheerup
    });
  });
});



module.exports = router;
