'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    function generateRandomTime() {
      // 生成随机的 HH:MM:SS 时间
      const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
      const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
      const seconds = String(Math.floor(Math.random() * 60)).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
    
    function generateUserWeeklyOnlineTimeData(numStudents, weekStart) {
      const data = [];
      for (let i = 1; i <= numStudents; i++) {
        data.push({
          studentId: i, // 学生 ID
          weekStart: weekStart, // 周的起始日期
          monday: generateRandomTime(), // 周一在线时间
          tuesday: generateRandomTime(), // 周二在线时间
          wednesday: generateRandomTime(), // 周三在线时间
          thursday: generateRandomTime(), // 周四在线时间
          friday: generateRandomTime(), // 周五在线时间
          saturday: generateRandomTime(), // 周六在线时间
          sunday: generateRandomTime(), // 周日在线时间
          createdAt: new Date(), // 创建时间
          updatedAt: new Date(), // 更新时间
        });
      }
      return data;
    }

    const data=generateUserWeeklyOnlineTimeData(10, new Date('2025-3-12'))

    await queryInterface.bulkInsert('WeekTimes',data,{})
   },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('WeekTimes', null, {});
  }
};
