'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', [
      {
        name: 'Python 基础',
        description: '本课程将带你入门 Python 编程语言，掌握基本语法和常用功能。',
        image_url: 'https://example.com/python.jpg',
        instructorId: 1,
        Recommend: 1,  // yes
        Classic: 0,    // no
        Type: '编程语言',
        Video: 'https://example.com/python_video.mp4',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Java 高级开发',
        description: '深入学习 Java 高级特性，包括多线程、网络编程和设计模式。',
        image_url: 'https://example.com/java.jpg',
        instructorId: 2,
        Recommend: 0,
        Classic: 1,
        Type: '编程语言',
        Video: 'https://example.com/java_video.mp4',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: '数据结构与算法',
        description: '掌握常用数据结构和算法，提升编程能力和解决复杂问题的能力。',
        image_url: 'https://example.com/dsa.jpg',
        instructorId: 3,
        Recommend: 1,
        Classic: 1,
        Type: '计算机科学',
        Video: 'https://example.com/dsa_video.mp4',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: '前端开发基础',
        description: '学习 HTML、CSS 和 JavaScript，掌握前端开发的基本技能。',
        image_url: 'https://example.com/frontend.jpg',
        instructorId: 4,
        Recommend: 1,
        Classic: 0,
        Type: 'Web 开发',
        Video: 'https://example.com/frontend_video.mp4',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: '人工智能入门',
        description: '了解人工智能的基本概念，包括机器学习和深度学习的基础知识。',
        image_url: 'https://example.com/ai.jpg',
        instructorId: 5,
        Recommend: 0,
        Classic: 0,
        Type: '人工智能',
        Video: 'https://example.com/ai_video.mp4',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: '数据库原理与应用',
        description: '学习数据库的基本原理，掌握 SQL 语言和数据库设计方法。',
        image_url: 'https://example.com/db.jpg',
        instructorId: 6,
        Recommend: 1,
        Classic: 1,
        Type: '数据库',
        Video: 'https://example.com/db_video.mp4',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: '操作系统原理',
        description: '深入理解操作系统的工作原理，包括进程管理、内存管理和文件系统。',
        image_url: 'https://example.com/os.jpg',
        instructorId: 7,
        Recommend: 0,
        Classic: 1,
        Type: '计算机科学',
        Video: 'https://example.com/os_video.mp4',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: '网络安全基础',
        description: '学习网络安全的基本概念，掌握常见的安全技术和防护方法。',
        image_url: 'https://example.com/security.jpg',
        instructorId: 8,
        Recommend: 1,
        Classic: 0,
        Type: '网络安全',
        Video: 'https://example.com/security_video.mp4',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: '移动应用开发',
        description: '学习 Android 和 iOS 应用开发的基础知识，掌握移动开发技能。',
        image_url: 'https://example.com/mobile.jpg',
        instructorId: 9,
        Recommend: 0,
        Classic: 0,
        Type: '移动开发',
        Video: 'https://example.com/mobile_video.mp4',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: '云计算与大数据',
        description: '了解云计算和大数据的基本概念，掌握相关技术和工具的使用。',
        image_url: 'https://example.com/cloud.jpg',
        instructorId: 10,
        Recommend: 1,
        Classic: 0,
        Type: '云计算',
        Video: 'https://example.com/cloud_video.mp4',
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
