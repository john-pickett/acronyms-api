const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

const models = {
  User: sequelize.import('../models/user')
}

module.exports = { sequelize, models };