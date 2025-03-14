'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudyTimes', {
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
      date: {
        defaultValue:new Date(),
        type: Sequelize.DATE
      },
      duration: {
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
    await queryInterface.addIndex(
      'StudyTimes',{
        fields:['studentId'],
        unique:true
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudyTimes');
  }
};