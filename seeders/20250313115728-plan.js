'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Plans', [
      {
        studentId: 1,
        goal: '掌握 Python 编程基础，能够独立完成简单的项目开发。',
        interests: '编程、数据分析、人工智能',
        level: '初学者',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        studentId: 2,
        goal: '通过 Java 高级开发课程，提升在企业级应用开发中的能力。',
        interests: '后端开发、Java 框架、微服务',
        level: '中级',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        studentId: 3,
        goal: '深入学习数据结构与算法，为算法竞赛做准备。',
        interests: '算法竞赛、计算机科学、数学',
        level: '高级',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        studentId: 4,
        goal: '掌握前端开发技能，能够设计和实现响应式网站。',
        interests: '前端开发、UI/UX 设计、JavaScript',
        level: '初学者',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        studentId: 5,
        goal: '了解人工智能的基本概念，掌握机器学习的基础知识。',
        interests: '人工智能、机器学习、深度学习',
        level: '初学者',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        studentId: 6,
        goal: '通过数据库课程，提升 SQL 编程和数据库设计能力。',
        interests: '数据库、数据安全、SQL',
        level: '中级',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        studentId: 7,
        goal: '学习操作系统原理，为后续的系统开发打下基础。',
        interests: '操作系统、Linux、Windows',
        level: '高级',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        studentId: 8,
        goal: '掌握网络安全的基本知识，能够进行简单的安全防护和漏洞分析。',
        interests: '网络安全、信息安全、加密技术',
        level: '初学者',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        studentId: 9,
        goal: '学习移动应用开发，能够开发简单的 Android 和 iOS 应用。',
        interests: '移动开发、Android、iOS',
        level: '中级',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        studentId: 10,
        goal: '了解云计算和大数据技术，掌握相关工具的使用。',
        interests: '云计算、大数据、Hadoop',
        level: '高级',
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Plans', null, {});
  }
};
