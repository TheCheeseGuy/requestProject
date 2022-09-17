const { DataTypes } = require('sequelize')

module.exports = model;

function model(sequelize) {
    const attributes = {
        nameOfSponsor: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        eventStartTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        eventEndTime: {
            type: DataTypes.TIME,
            allowNull: false
        }, 
        setUpTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        takeDownTime:{
            type: DataTypes.TIME,
            allowNull: false
        },
        numberOFGuests: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        foodOrBeverage: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        doneAt: { type: DataTypes.DATE }
    }
    return sequelize.define('requests', attributes)
}