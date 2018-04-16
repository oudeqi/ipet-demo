const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema({
  portrait: {
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
  birthday: {
    type: Date,
    default: new Date()
  }
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