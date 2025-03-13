'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.TINYINT
      },
      home_address: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      avatar: {
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
      'Admins',{
        fields:['username'],
        unique:true
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Admins');
  }
};