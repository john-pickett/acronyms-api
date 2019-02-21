const acronym = (sequelize, DataTypes) => {
    constAcronym = sequelize.define('acronym', {
        acronym: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        notes: {
            type: DataTypes.TEXT
        }
    })
    return acronym;
}

module.exports = acronym;