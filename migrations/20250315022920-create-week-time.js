'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WeekTimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      studentId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      weekStart: {
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      monday: {
        defaultValue: '00:00:00',
        type: Sequelize.TIME
      },
      tuesday: {
        defaultValue: '00:00:00',
        type: Sequelize.TIME
      },
      wednesday: {
        defaultValue: '00:00:00',
        type: Sequelize.TIME
      },
      thursday: {
        defaultValue: '00:00:00',
        type: Sequelize.TIME
      },
      friday: {
        defaultValue: '00:00:00',
        type: Sequelize.TIME
      },
      saturday: {
        defaultValue: '00:00:00',
        type: Sequelize.TIME
      },
      sunday: {
        defaultValue: '00:00:00',
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        defaultValue:new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue:new Date(),
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WeekTimes');
  }
};