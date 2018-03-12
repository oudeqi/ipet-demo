var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  uid: Number,
  username: String,
  createTime: Date,
  lastLogin: Date  
});

module.exports = mongoose.model('User', UserSchema);