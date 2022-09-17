const { DataTypes } = require('sequelize')

module.exports = model 

function model(sequelize){
    const attributes = {
        facilityName: {
            type: DataTypes.STRING
        }
    }
    return sequelize.define('facilities', attributes)
}