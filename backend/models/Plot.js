const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Plot = sequelize.define('Plot', {
  landId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  plotNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  area: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  coordinates: {
    type: DataTypes.JSON,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('available', 'sold'),
    defaultValue: 'available'
  },
  price: DataTypes.NUMBER,
  dimensions: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
}, {
  tableName: 'plots',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Plot;
