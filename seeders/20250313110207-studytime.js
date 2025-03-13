'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('StudyTimes', [
    { studentId: 1, date: '2025-03-01', duration: '02:00:00', createdAt: new Date(), updatedAt: new Date() },
  { studentId: 2, date: '2025-03-02', duration: '01:30:00', createdAt: new Date(), updatedAt: new Date() },
  { studentId: 3, date: '2025-03-03', duration: '02:30:00', createdAt: new Date(), updatedAt: new Date() },
  { studentId: 4, date: '2025-03-04', duration: '01:00:00', createdAt: new Date(), updatedAt: new Date() },
  { studentId: 5, date: '2025-03-05', duration: '03:00:00', createdAt: new Date(), updatedAt: new Date() },
  { studentId: 6, date: '2025-03-06', duration: '02:00:00', createdAt: new Date(), updatedAt: new Date() },
  { studentId: 7, date: '2025-03-07', duration: '01:40:00', createdAt: new Date(), updatedAt: new Date() },
  { studentId: 8, date: '2025-03-08', duration: '03:20:00', createdAt: new Date(), updatedAt: new Date() },
  { studentId: 9, date: '2025-03-09', duration: '02:10:00', createdAt: new Date(), updatedAt: new Date() },
  { studentId: 10, date: '2025-03-10', duration: '01:50:00', createdAt: new Date(), updatedAt: new Date() }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StudyTimes', null, {});
  }
};
