'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
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
      gender: {
        allowNull: false,
        type: Sequelize.TINYINT
      },
      birthdate: {
        type: Sequelize.DATE
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      school: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      avatar: {
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        defaultValue:1,
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
      'Students',{
        fields:['username'],
        unique:true
      }
    );
    await queryInterface.addIndex(
      'Students',{
        fields:['email'],
        unique:true
      }
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};