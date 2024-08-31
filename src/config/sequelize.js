const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: 'db/tankman-db.sqlite',
    //logging: console.info
    logging: false
  },
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.query('PRAGMA journal_mode = WAL;');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Sync models with database
sequelize.sync();

module.exports = sequelize;
