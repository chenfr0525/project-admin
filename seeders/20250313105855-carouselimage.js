'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CarouselImages', [
      { image_url: 'https://example.com/image1.jpg', description: '第一张轮播图',
        createdAt:new Date(),
        updatedAt:new Date() },
    { image_url: 'https://example.com/image2.jpg', description: '第二张轮播图',
      createdAt:new Date(),
      updatedAt:new Date() },
    { image_url: 'https://example.com/image3.jpg', description: '第三张轮播图',
      createdAt:new Date(),
      updatedAt:new Date() },
    { image_url: 'https://example.com/image4.jpg', description: '第四张轮播图' ,
      createdAt:new Date(),
      updatedAt:new Date()}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CarouselImages', null, {});
  }
};
