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







// root route
app.get('/', function(req, res) {
  res.send('I am here!');
});

// listener
app.listen(port, function(){
  console.log('Cheerups is running on port: ' + port);
});
