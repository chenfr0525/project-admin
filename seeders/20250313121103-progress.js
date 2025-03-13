'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Progresses', [
    { plancourseId: 1, progress: 0.25,
      createdAt:new Date(),
      updatedAt:new Date() },  // 学习进度为 25%
    { plancourseId: 2, progress: 0.5 ,
      createdAt:new Date(),
      updatedAt:new Date()},   // 学习进度为 50%
    { plancourseId: 3, progress: 0.75,
      createdAt:new Date(),
      updatedAt:new Date() },  // 学习进度为 75%
    { plancourseId: 4, progress: 0.1,
      createdAt:new Date(),
      updatedAt:new Date() },   // 学习进度为 10%
    { plancourseId: 5, progress: 0.3,
      createdAt:new Date(),
      updatedAt:new Date() },   // 学习进度为 30%
    { plancourseId: 6, progress: 0.6,
      createdAt:new Date(),
      updatedAt:new Date() },   // 学习进度为 60%
    { plancourseId: 7, progress: 0.9 ,
      createdAt:new Date(),
      updatedAt:new Date()},   // 学习进度为 90%
    { plancourseId: 8, progress: 0.4 ,
      createdAt:new Date(),
      updatedAt:new Date()},   // 学习进度为 40%
    { plancourseId: 9, progress: 0.8 ,
      createdAt:new Date(),
      updatedAt:new Date()},   // 学习进度为 80%
    { plancourseId: 10, progress: 1.0,
      createdAt:new Date(),
      updatedAt:new Date() },  // 学习进度为 100%（已完成）
    { plancourseId: 11, progress: 0.2 ,
      createdAt:new Date(),
      updatedAt:new Date()},  // 学习进度为 20%
    { plancourseId: 12, progress: 0.55,
      createdAt:new Date(),
      updatedAt:new Date() }, // 学习进度为 55%
    { plancourseId: 13, progress: 0.7,
      createdAt:new Date(),
      updatedAt:new Date() },  // 学习进度为 70%
    { plancourseId: 14, progress: 0.15,
      createdAt:new Date(),
      updatedAt:new Date() }, // 学习进度为 15%
    { plancourseId: 15, progress: 0.35 ,
      createdAt:new Date(),
      updatedAt:new Date()}, // 学习进度为 35%
    { plancourseId: 16, progress: 0.65,
      createdAt:new Date(),
      updatedAt:new Date() }, // 学习进度为 65%
    { plancourseId: 17, progress: 0.95,
      createdAt:new Date(),
      updatedAt:new Date() }, // 学习进度为 95%
    { plancourseId: 18, progress: 0.45,
      createdAt:new Date(),
      updatedAt:new Date() }, // 学习进度为 45%
    { plancourseId: 19, progress: 0.85 ,
      createdAt:new Date(),
      updatedAt:new Date()}, // 学习进度为 85%
    { plancourseId: 20, progress: 1.0 ,
      createdAt:new Date(),
      updatedAt:new Date()}   // 学习进度为 100%（已完成）
   ], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Progresses', null, {});
  }
};
