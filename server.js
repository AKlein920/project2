// dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// port
var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost/cheerups_app';

// database
mongoose.connect(mongoDBURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected and ready to cheer!');
});

// require the controllers
var cheerupsController = require('./controllers/cheerupsController.js');
var usersController = require('./controllers/usersController.js');

// middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// controller middleware
app.use('/cheerups', cheerupsController);
app.use('/users', usersController);

// root route
app.get('/', function(req, res) {
  res.redirect('/cheerups');
});

// listener
app.listen(port, function(){
  console.log('Cheerups is running on port: ' + port);
});
