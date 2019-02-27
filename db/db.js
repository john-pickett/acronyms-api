const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	ssl: true,
	"dialectOptions": {
		"ssl": true
	}
})

const models = {
  User: sequelize.import('../models/user'),
  Acronym: sequelize.import('../models/acronym')
}

module.exports = { sequelize, models };