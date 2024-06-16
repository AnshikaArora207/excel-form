const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Country = sequelize.define('Country', {
  countryCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  countryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Country;
