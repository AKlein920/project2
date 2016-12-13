var express = require('express');
router = express.Router();
var User = require('../models/users.js');

// sign in route
router.get('/new', function(req, res) {
  res.render('sessions/new.ejs');
});

// password verification route
router.post('/', function(req, res) {
  User.findOne({ username: req.body.username}, function(err, foundUser) {
    if (req.body.password == foundUser.password) {
      req.session.currentuser = foundUser;
      res.redirect('/cheerups');
    } else {
      res.send('Incorrect password!');
    }
  });
});

// destroy session route
router.delete('/', function(req, res) {
  req.session.destroy();
  res.redirect('/cheerups');
});

module.exports = router;
