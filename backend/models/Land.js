const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Land = sequelize.define('Land', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalArea: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  coordinates: {
    type: DataTypes.JSON,
    allowNull: false
  },
  description: DataTypes.STRING,
  imageUrl: DataTypes.STRING
}, {
  tableName: 'lands',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Land;
