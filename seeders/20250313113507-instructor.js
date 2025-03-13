'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Instructors', [
    {
      name: '李明',
      CourseId: 1,
      bio: '资深 Python 开发工程师，拥有 10 年以上编程经验，擅长数据处理和机器学习。',
      avatar_url: 'https://example.com/avatar1.jpg',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      name: '王强',
      CourseId: 2,
      bio: 'Java 技术专家，专注于企业级应用开发和架构设计，曾主导多个大型项目。',
      avatar_url: 'https://example.com/avatar2.jpg',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      name: '赵伟',
      CourseId: 3,
      bio: '计算机科学博士，专注于数据结构与算法研究，多次在国际竞赛中获奖。',
      avatar_url: 'https://example.com/avatar3.jpg',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      name: '孙丽',
      CourseId: 4,
      bio: '前端开发专家，精通 HTML、CSS 和 JavaScript，擅长响应式设计和用户体验优化。',
      avatar_url: 'https://example.com/avatar4.jpg',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      name: '周杰',
      CourseId: 5,
      bio: '人工智能领域专家，专注于机器学习和深度学习研究，发表多篇学术论文。',
      avatar_url: 'https://example.com/avatar5.jpg',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      name: '吴涛',
      CourseId: 6,
      bio: '数据库专家，拥有丰富的 SQL 和数据库设计经验，擅长性能优化和数据安全。',
      avatar_url: 'https://example.com/avatar6.jpg',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      name: '陈宇',
      CourseId: 7,
      bio: '操作系统专家，专注于 Linux 和 Windows 系统开发，曾参与多个开源项目。',
      avatar_url: 'https://example.com/avatar7.jpg',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      name: '刘洋',
      CourseId: 8,
      bio: '网络安全专家，专注于网络安全防护和漏洞分析，多次为企业提供安全咨询。',
      avatar_url: 'https://example.com/avatar8.jpg',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      name: '徐静',
      CourseId: 9,
      bio: '移动应用开发专家，精通 Android 和 iOS 开发，曾开发多款热门应用。',
      avatar_url: 'https://example.com/avatar9.jpg',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      name: '何伟',
      CourseId: 10,
      bio: '云计算专家，专注于云计算架构设计和大数据处理，曾主导多个云平台项目。',
      avatar_url: 'https://example.com/avatar10.jpg',
      createdAt:new Date(),
      updatedAt:new Date()
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Instructors', null, {});
  }
};
