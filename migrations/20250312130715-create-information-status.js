'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InformationStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      informationId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      studentId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.TINYINT
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
      'InformationStatuses',{
        fields:['informationId']
      }
    );
    await queryInterface.addIndex(
      'InformationStatuses',{
        fields:['studentId']
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InformationStatuses');
  }
};