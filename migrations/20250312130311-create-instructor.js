'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Instructors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CourseId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bio: {
        type: Sequelize.TEXT
      },
      avatar_url: {
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
      'Instructors',{
        fields:['CourseId']
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Instructors');
  }
};