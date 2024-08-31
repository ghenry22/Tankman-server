'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Settings', [
      {
        name: 'schedulerEnabled',
        value: 'false',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'schedulerInterval',
        value: '0',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Settings', {
      name: {
        [Sequelize.Op.in]: ['setting1', 'setting2']
      }
    }, {});
  }
};