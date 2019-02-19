const user = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		firstName: {
			type: DataTypes.STRING
		},
		lastName: {
			type: DataTypes.STRING
		}
	})
	return User;
}

module.exports = user;