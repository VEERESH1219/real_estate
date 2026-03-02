const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Plot3D = sequelize.define('Plot3D', {
  plotId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  modelUrl: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  dimensions: {
    type: DataTypes.JSON,
    defaultValue: { width: 10, length: 10, height: 3 }
  },
  houseModel: {
    type: DataTypes.STRING,
    defaultValue: 'basic'
  },
  colors: {
    type: DataTypes.JSON,
    defaultValue: { wall: '#f5f5dc', roof: '#8b4513', ground: '#228b22' }
  }
}, {
  tableName: 'plot3ds',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Plot3D;
