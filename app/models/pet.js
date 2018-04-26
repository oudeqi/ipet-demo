const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema({
  avatar: {
  	type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  varieties: {
    type: String,
    required: true
  },
  birthday: Date
}, {
  collection : 'pets',
});

PetSchema.methods.methodFunc = function(cb) {
  cb()
}

PetSchema.statics.staticFunc = function(cb) {
  cb()
}

module.exports = mongoose.model('Pet', PetSchema);