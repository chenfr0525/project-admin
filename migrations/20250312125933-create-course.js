'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
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
      description: {
        type: Sequelize.TEXT
      },
      image_url: {
        type: Sequelize.STRING
      },
      instructorId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      recommend: {
        defaultValue:0,
        allowNull: false,
        type: Sequelize.TINYINT
      },
      classic: {
        defaultValue:0,
        allowNull: false,
        type: Sequelize.TINYINT
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      video: {
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
      'Courses',{
        fields:['instructorId']
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};