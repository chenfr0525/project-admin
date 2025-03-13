'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CourseChapters', [
      {
        courseId: 1,  // 对应课程表中的课程 ID
        chapter_number: 1,
        title: 'Python 基础语法',
        content: '本章介绍 Python 的基本语法，包括变量、数据类型和运算符。',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        courseId: 1,
        chapter_number: 2,
        title: '控制流与循环',
        content: '学习 Python 中的条件语句和循环结构，掌握程序流程控制。',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        courseId: 2,
        chapter_number: 1,
        title: 'Java 基础与面向对象',
        content: '本章介绍 Java 的基本语法和面向对象的核心概念。',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        courseId: 2,
        chapter_number: 2,
        title: 'Java 集合框架',
        content: '学习 Java 的集合框架，包括 List、Set 和 Map 的使用。',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        courseId: 3,
        chapter_number: 1,
        title: '数据结构基础',
        content: '介绍常见的数据结构，如数组、链表、栈和队列。',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        courseId: 3,
        chapter_number: 2,
        title: '算法入门',
        content: '学习基本的算法设计方法，如排序和查找算法。',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        courseId: 4,
        chapter_number: 1,
        title: 'HTML 与 CSS 基础',
        content: '学习 HTML 和 CSS 的基本语法，掌握网页布局和样式设计。',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        courseId: 4,
        chapter_number: 2,
        title: 'JavaScript 基础',
        content: '介绍 JavaScript 的基本语法和 DOM 操作。',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        courseId: 5,
        chapter_number: 1,
        title: '人工智能概述',
        content: '了解人工智能的基本概念和发展历程。',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        courseId: 5,
        chapter_number: 2,
        title: '机器学习基础',
        content: '学习机器学习的基本算法和模型，如线性回归和决策树。',
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CourseChapters', null, {});
  }
};
