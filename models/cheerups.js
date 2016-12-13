var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cheerupSchema = new Schema({
  userId: String,
  visualmedia: String,
  body: { type: String, maxlength: 139 },
  createdat: { type: Date, required: true, default: Date.now },
  cheers: Number,
  keywords: Array
});

var Cheerup = mongoose.model('Cheerup', cheerupSchema);

module.exports = Cheerup;
