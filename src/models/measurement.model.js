const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); // Import the Sequelize instance

class Measurement extends Model {}

Measurement.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    tankId: DataTypes.NUMBER,
    distanceFromSensor: DataTypes.NUMBER,
    availableCapacity: DataTypes.NUMBER,
    availablePercentage: DataTypes.NUMBER,
    timeStamp: DataTypes.DATE
}, { 
    sequelize, 
    modelName: 'measurement' 
});

module.exports = Measurement;