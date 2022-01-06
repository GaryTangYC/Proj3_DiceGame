const sequelizePackage = require('sequelize');
const allConfig = require('../config/config.js');

const initUserModel = require('./userModel');

const { Sequelize } = sequelizePackage;

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = initUserModel(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;