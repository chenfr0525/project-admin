'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Informations', [
      {
        title: '欢迎使用学习平台',
        content: '欢迎加入我们的学习平台，祝您学习愉快！',
        adminId: 1,
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '新课程上线通知',
        content: '我们新增了多门热门课程，快去查看吧！',
        adminId: 2,
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '系统维护提醒',
        content: '本周六将进行系统维护，届时可能会有短暂的不可用时间，请提前做好安排。',
        adminId: 3,
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '学习计划更新',
        content: '您的学习计划已更新，请登录查看最新安排。',
        adminId: 4,
        status: 0,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '课程优惠活动',
        content: '本周购买课程享受 8 折优惠，不要错过哦！',
        adminId: 5,
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '学习进度提醒',
        content: '您的学习进度即将到期，请加快学习进度！',
        adminId: 6,
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '新功能上线',
        content: '我们新增了学习笔记功能，快来体验吧！',
        adminId: 7,
        status: 0,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '安全更新通知',
        content: '我们已更新系统安全策略，您的账号将更加安全。',
        adminId: 8,
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '学习社区开放',
        content: '我们的学习社区已正式开放，欢迎加入交流！',
        adminId: 9,
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '管理员公告',
        content: '感谢您的支持，我们会不断优化平台功能！',
        adminId: 10,
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Informations', null, {});
  }
};
