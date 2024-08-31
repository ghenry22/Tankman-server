const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: 'db/tankman-db.sqlite',
    //logging: console.info
    logging: false
  },
);

sequelize.afterConnect(async (connection) => {
  console.log('AFTER CONNECT HOOK');
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Sync models with database
sequelize.sync();

module.exports = sequelize;
