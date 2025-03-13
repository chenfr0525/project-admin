'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Motivationalquotes', [
    { quote: '成功的秘诀在于坚持自已的目标和信念。',
      createdAt:new Date(),
      updatedAt:new Date() },
    { quote: '无论你觉得自己能否成功，你都是对的。' ,
      createdAt:new Date(),
      updatedAt:new Date()},
    { quote: '不要等待机会，而要创造机会。',
      createdAt:new Date(),
      updatedAt:new Date() },
    { quote: '只有不断找寻机会的人才会及时把握机会。',
      createdAt:new Date(),
      updatedAt:new Date() },
    { quote: '要偷偷努力，成为别人的遥不可及' ,
      createdAt:new Date(),
      updatedAt:new Date()},
    { quote: '他们都假装颓废，你可别上当。',
      createdAt:new Date(),
      updatedAt:new Date() },
    { quote: '你要悄悄努力，然后惊艳所有人' ,
      createdAt:new Date(),
      updatedAt:new Date()},
    { quote: '世事千帆过，前方终会是温柔和月光。',
      createdAt:new Date(),
      updatedAt:new Date() },
    { quote: '我正在追逐从前那个发光的自己',
      createdAt:new Date(),
      updatedAt:new Date() },
    { quote: '从现在开始努力一切都还来得及',
      createdAt:new Date(),
      updatedAt:new Date() },
    { quote: '再相逢时，希望我们都在最高处',
      createdAt:new Date(),
      updatedAt:new Date() }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Motivationalquotes', null, {});
  }
};
