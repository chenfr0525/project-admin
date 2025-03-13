'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [
      {
        username: 'admin1',
        phone: '13800138001',
        password:'111111',
        address: '北京市朝阳区',
        gender: 1, // 1 表示男，0 表示女
        home_address: '北京市海淀区',
        bio: '系统管理员',
        avatar: 'https://example.com/admin1.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: 'admin2',
        phone: '13900139001',
        password:'111111',
        address: '上海市徐汇区',
        gender: 0,
        home_address: '上海市浦东新区',
        bio: '负责学生管理',
        avatar: 'https://example.com/admin2.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: 'admin3',
        phone: '13700137001',
        password:'111111',
        address: '广州市越秀区',
        gender: 1,
        home_address: '广州市天河区',
        bio: '负责课程管理',
        avatar: 'https://example.com/admin3.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: 'admin4',
        phone: '13600136001',
        password:'111111',
        address: '深圳市南山区',
        gender: 0,
        home_address: '深圳市福田区',
        bio: '负责系统维护',
        avatar: 'https://example.com/admin4.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: 'admin5',
        phone: '13500135001',
        password:'111111',
        address: '杭州市西湖区',
        gender: 1,
        home_address: '杭州市滨江区',
        bio: '负责数据管理',
        avatar: 'https://example.com/admin5.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: 'admin6',
        phone: '13400134001',
        password:'111111',
        address: '南京市鼓楼区',
        gender: 0,
        home_address: '南京市玄武区',
        bio: '负责安全管理',
        avatar: 'https://example.com/admin6.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: 'admin7',
        phone: '13300133001',
        password:'111111',
        address: '武汉市洪山区',
        gender: 1,
        home_address: '武汉市江汉区',
        bio: '负责用户管理',
        avatar: 'https://example.com/admin7.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: 'admin8',
        phone: '13200132001',
        password:'111111',
        address: '成都市武侯区',
        gender: 0,
        home_address: '成都市锦江区',
        bio: '负责日志管理',
        avatar: 'https://example.com/admin8.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: 'admin9',
        phone: '13100131001',
        password:'111111',
        address: '重庆市渝中区',
        gender: 1,
        home_address: '重庆市江北区',
        bio: '负责权限管理',
        avatar: 'https://example.com/admin9.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: 'admin10',
        phone: '13000130001',
        password:'111111',
        address: '西安市雁塔区',
        gender: 0,
        home_address: '西安市未央区',
        bio: '负责通知管理',
        avatar: 'https://example.com/admin10.jpg',
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
