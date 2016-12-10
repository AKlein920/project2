// set up express Router
var express = require('express');
var router = express.Router();

// require the models
var Cheerup = require('../models/cheerups.js');

// all routes

// index route - show cheerups
router.get('/', function(req, res) {
  res.send('cheerups will show here');
});






module.exports = router;
