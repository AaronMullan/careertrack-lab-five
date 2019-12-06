const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  drums: {
    type: String,
    required: true
  },
  bass: {
    type: String,
    required: true
  },
  canCountToFour: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Band', schema);
