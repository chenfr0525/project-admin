'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('informationStatuses', [
      { informationId: 1, studentId: 1, status: 1,
        createdAt:new Date(),
        updatedAt:new Date() },  // 已读
    { informationId: 1, studentId: 2, status: 0,
      createdAt:new Date(),
      updatedAt:new Date() },  // 未读
    { informationId: 2, studentId: 1, status: 0,
      createdAt:new Date(),
      updatedAt:new Date() },  // 未读
    { informationId: 2, studentId: 3, status: 1,
      createdAt:new Date(),
      updatedAt:new Date() },  // 已读
    { informationId: 3, studentId: 4, status: 1,
      createdAt:new Date(),
      updatedAt:new Date() },  // 已读
    { informationId: 3, studentId: 5, status: 0,
      createdAt:new Date(),
      updatedAt:new Date() },  // 未读
    { informationId: 4, studentId: 6, status: 1,
      createdAt:new Date(),
      updatedAt:new Date() },  // 已读
    { informationId: 4, studentId: 7, status: 0 ,
      createdAt:new Date(),
      updatedAt:new Date()},  // 未读
    { informationId: 5, studentId: 8, status: 1 ,
      createdAt:new Date(),
      updatedAt:new Date()},  // 已读
    { informationId: 5, studentId: 9, status: 0,
      createdAt:new Date(),
      updatedAt:new Date() },  // 未读
    { informationId: 6, studentId: 10, status: 1,
      createdAt:new Date(),
      updatedAt:new Date() }, // 已读
    { informationId: 7, studentId: 1, status: 0,
      createdAt:new Date(),
      updatedAt:new Date() },  // 未读
    { informationId: 8, studentId: 2, status: 1 ,
      createdAt:new Date(),
      updatedAt:new Date()},  // 已读
    { informationId: 9, studentId: 3, status: 0 ,
      createdAt:new Date(),
      updatedAt:new Date()},  // 未读
    { informationId: 10, studentId: 4, status: 1,
      createdAt:new Date(),
      updatedAt:new Date() }  // 已读
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('informationStatuses', null, {});
  }
};
