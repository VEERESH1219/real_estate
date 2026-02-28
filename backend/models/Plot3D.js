const mongoose = require('mongoose');

const plot3dSchema = new mongoose.Schema({
  plotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plot',
    required: true
  },
  modelUrl: {
    type: String,
    default: ''
  },
  dimensions: {
    width: { type: Number, default: 10 },
    length: { type: Number, default: 10 },
    height: { type: Number, default: 3 }
  },
  houseModel: {
    type: String,
    default: 'basic'
  },
  colors: {
    wall: { type: String, default: '#f5f5dc' },
    roof: { type: String, default: '#8b4513' },
    ground: { type: String, default: '#228b22' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Plot3D', plot3dSchema);
