const { DataTypes } = require('sequelize')

module.exports = model

function model(sequelize) {
    const attributes = {
        equipment: {
            type: DataTypes.STRING
        }
    }
    return sequelize.define('ITequipment', attributes)
}


