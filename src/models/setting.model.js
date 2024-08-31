const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); // Import the Sequelize instance

class Setting extends Model {}

Setting.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    value: DataTypes.STRING
}, { 
    sequelize, 
    modelName: 'setting' 
});

module.exports = Setting;