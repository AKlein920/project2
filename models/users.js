var mongoose = require('mongoose');
var Cheerup = require('./cheerups.js');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  cheerupPage: [Cheerup.schema]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
