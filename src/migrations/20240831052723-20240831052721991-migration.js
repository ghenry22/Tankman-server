'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the Settings table
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create the Tanks table
    await queryInterface.createTable('Tanks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      diameter: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      height: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      sensorDistanceWhenFull: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      sensorId: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      statedCapacity: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      capacityUnit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isRound: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      timeStamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create the Measurements table
    await queryInterface.createTable('Measurements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tankId: {
        type: Sequelize.NUMBER,
        allowNull: false,
        references: {
          model: 'Tanks',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      distanceFromSensor: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      availableCapacity: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      availablePercentage: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      timeStamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Measurements');
    await queryInterface.dropTable('Tanks');
    await queryInterface.dropTable('Settings');
  }
};