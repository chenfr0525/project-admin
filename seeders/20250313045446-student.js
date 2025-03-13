'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Students', [
      {
        username: '张三',
        gender: 1, // 1 表示男，0 表示女
        birthdate: '2000-01-01',
        phone: '13800138000',
        password: '$2a$10$examplehashedpassword', // 假设是加密后的密码
        email: 'zhangsan@example.com',
        address: '北京市海淀区',
        school: '北京大学',
        bio: '热爱编程，喜欢算法',
        avatar: 'https://example.com/avatar1.jpg',
        status: 1, // 1 表示正常
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: '李四',
        gender: 0,
        birthdate: '2001-05-15',
        phone: '13900139000',
        password: '$2a$10$examplehashedpassword',
        email: 'lisi@example.com',
        address: '上海市浦东新区',
        school: '复旦大学',
        bio: '喜欢机器学习',
        avatar: 'https://example.com/avatar2.jpg',
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: '王五',
        gender: 1,
        birthdate: '1999-12-25',
        phone: '13700137000',
        password: '$2a$10$examplehashedpassword',
        email: 'wangwu@example.com',
        address: '广州市天河区',
        school: '中山大学',
        bio: '对前端开发感兴趣',
        avatar: 'https://example.com/avatar3.jpg',
        status: 0, // 0 表示禁用
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: '赵六',
        gender: 0,
        birthdate: '2002-03-10',
        phone: '13600136000',
        password: '$2a$10$examplehashedpassword',
        email: 'zhaoliu@example.com',
        address: '深圳市南山区',
        school: '清华大学',
        bio: '热爱人工智能',
        avatar: 'https://example.com/avatar4.jpg',
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: '孙七',
        gender: 1,
        birthdate: '2000-07-20',
        phone: '13500135000',
        password: '$2a$10$examplehashedpassword',
        email: 'sunqi@example.com',
        address: '杭州市西湖区',
        school: '浙江大学',
        bio: '喜欢数据科学',
        avatar: 'https://example.com/avatar5.jpg',
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: '周八',
        gender: 0,
        birthdate: '2001-09-05',
        phone: '13400134000',
        password: '$2a$10$examplehashedpassword',
        email: 'zhouba@example.com',
        address: '南京市鼓楼区',
        school: '南京大学',
        bio: '对网络安全感兴趣',
        avatar: 'https://example.com/avatar6.jpg',
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: '吴九',
        gender: 1,
        birthdate: '2000-11-15',
        phone: '13300133000',
        password: '$2a$10$examplehashedpassword',
        email: 'wujiu@example.com',
        address: '武汉市洪山区',
        school: '武汉大学',
        bio: '热爱开源项目',
        avatar: 'https://example.com/avatar7.jpg',
        status: 0,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: '郑十',
        gender: 0,
        birthdate: '2002-02-28',
        phone: '13200132000',
        password: '$2a$10$examplehashedpassword',
        email: 'zhengshi@example.com',
        address: '成都市武侯区',
        school: '四川大学',
        bio: '喜欢后端开发',
        avatar: 'https://example.com/avatar8.jpg',
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: '刘十一',
        gender: 1,
        birthdate: '2001-04-12',
        phone: '13100131000',
        password: '$2a$10$examplehashedpassword',
        email: 'liushiyi@example.com',
        address: '重庆市渝中区',
        school: '重庆大学',
        bio: '对区块链感兴趣',
        avatar: 'https://example.com/avatar9.jpg',
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        username: '陈十二',
        gender: 0,
        birthdate: '2000-08-18',
        phone: '13000130000',
        password: '$2a$10$examplehashedpassword',
        email: 'chenshier@example.com',
        address: '西安市雁塔区',
        school: '西安交通大学',
        bio: '热爱嵌入式开发',
        avatar: 'https://example.com/avatar10.jpg',
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Students', null, {});
  }
};
