var mongoose = require('./mongoose.config.js');

// ------------------------------------------------
var BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  publishTime: Date
});

module.exports = mongoose.model('Book', BookSchema);