const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: 'db/tankman-db.sqlite',
    logging: console.info
  },
);

// Sync models with database
sequelize.sync();

module.exports = sequelize;