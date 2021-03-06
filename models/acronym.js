const acronym = (sequelize, DataTypes) => {
    const Acronym = sequelize.define('acronym', {
        abrev: {
            type: DataTypes.STRING
        },
        def: {
            type: DataTypes.STRING
        },
        notes: {
            type: DataTypes.TEXT
        }
    })
    return Acronym;
}

module.exports = acronym;
