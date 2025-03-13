'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Informations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      adminId: {
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        defaultValue:0,
        type: Sequelize.TINYINT
      },
      createdAt: {
        allowNull: false,
        defaultValue:new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue:new Date(),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex(
      'Informations',{
        fields:['adminId']
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Informations');
  }
};