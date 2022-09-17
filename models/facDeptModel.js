const { DataTypes } = require('sequelize')
const { SELECT } = require('sequelize/types/query-types')

module.exports = model

function model(sequelize) {
    const attributes = {
        itemName: {
            type: DataTypes.STRING
        }
    }
    return sequelize.define('item', attributes)
}