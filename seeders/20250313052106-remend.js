'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Remends', [
      {
        Name: '每日推荐',
        Img: 'https://example.com/recommend1.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        Name: '热门课程',
        Img: 'https://example.com/recommend2.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        Name: '精选算法',
        Img: 'https://example.com/recommend3.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        Name: '最新动态',
        Img: 'https://example.com/recommend4.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        Name: '学习计划',
        Img: 'https://example.com/recommend5.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        Name: '编程挑战',
        Img: 'https://example.com/recommend6.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        Name: '技术文章',
        Img: 'https://example.com/recommend7.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        Name: '社区活动',
        Img: 'https://example.com/recommend8.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        Name: '开源项目',
        Img: 'https://example.com/recommend9.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        Name: '职业发展',
        Img: 'https://example.com/recommend10.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Remends', null, {});
  }
};
