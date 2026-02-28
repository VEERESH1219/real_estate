const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
  landId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Land',
    required: true
  },
  plotNumber: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  coordinates: {
    type: [[Number]],
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available'
  },
  price: Number,
  dimensions: {
    width: Number,
    length: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Plot', plotSchema);
