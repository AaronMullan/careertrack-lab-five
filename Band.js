const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  drums: {
    type: String,
    required: true
  },
  bass: {
    type: String,
    required: true
  },
  guitar: {
    type: String,
    required: true
  },
  canCountToFour: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Band', schema);
