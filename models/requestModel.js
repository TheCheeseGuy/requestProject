const { DataTypes } = require('sequelize')

module.exports = model;

function model(sequelize) {
    const attributes = {
        nameOfSponsor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberOfGuest: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descriptionOfEvent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventTiming: {
            type: DataTypes.JSON,
            allowNull: false
        },
        foodBeverage: {
            type: DataTypes.ENUM('yes', 'no'),
            allowNull: false
        },
        facilityDetails: {
            type: DataTypes.JSON,
            allowNull: false
        },
        facilityDept: {
            type: DataTypes.JSON
        },
        itDept:{
            type: DataTypes.JSON
        }
    }
    return sequelize.define('requests', attributes)
}