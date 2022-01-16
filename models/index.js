const sequelizePackage = require('sequelize');
const allConfig = require('../config/config.js');

const initUserModel = require('./userModel');
const initGameModel = require('./gameModel');

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

db.Users = initUserModel(sequelize, Sequelize.DataTypes);
db.Games = initGameModel(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;