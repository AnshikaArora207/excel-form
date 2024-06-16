const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  formType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[A-Za-z]+$/,
    },
  },
  countryCode: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
});

module.exports = User;
