'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plans', {
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
      goal: {
        type: Sequelize.TEXT
      },
      interests: {
        type: Sequelize.TEXT
      },
      level: {
        type: Sequelize.STRING
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
      'Plans',{
        fields:['studentId']
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plans');
  }
};