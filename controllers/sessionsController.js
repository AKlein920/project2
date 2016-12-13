var express = require('express');
router = express.Router();
var User = require('../models/users.js');

router.get('/new', function(req, res) {
  res.render('sessions/new.ejs');
});

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

module.exports = router;
