'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlanCourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courseId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      planId: {
        allowNull: false,
        type: Sequelize.INTEGER
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
      'PlanCourses',{
        fields:['planId']
      }
    );
    await queryInterface.addIndex(
      'PlanCourses',{
        fields:['courseId']
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PlanCourses');
  }
};