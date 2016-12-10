// dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// port
var port = 3000;

// database
mongoose.connect('mongodb://localhost/cheerups_app');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected and ready to cheer!');
});

// require the controllers
var cheerupsController = require('./controllers/cheerupsController.js');

// middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// controller middleware
app.use('/cheerups', cheerupsController);

// root route
app.get('/', function(req, res) {
  res.redirect('/cheerups');
});

// listener
app.listen(port, function(){
  console.log('Cheerups is running on port: ' + port);
});
