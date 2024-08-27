const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); // Import the Sequelize instance

class Tank extends Model {}

Tank.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    diameter: DataTypes.NUMBER,
    height: DataTypes.NUMBER,
    sensorDistanceWhenFull: DataTypes.NUMBER,
    sensorId: DataTypes.NUMBER,
    statedCapacity: DataTypes.NUMBER,
    capacityUnit: DataTypes.STRING,
    timeStamp: DataTypes.DATE
}, { 
    sequelize, 
    modelName: 'tank' 
});

module.exports = Tank;