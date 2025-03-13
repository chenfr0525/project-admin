'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CommonErrors', [
      {
        title: '变量未初始化',
        code: `
          int x;
          printf("%d", x);  // 使用未初始化的变量
        `,
        reason: '变量未初始化，可能导致程序行为不可预测或崩溃。',
        correct_code: `
          int x = 0;  // 初始化变量
          printf("%d", x);
        `,
        Type: 'C',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '数组越界访问',
        code: `
          int arr[5] = {1, 2, 3, 4, 5};
          printf("%d", arr[5]);  // 越界访问
        `,
        reason: '访问数组时索引超出范围，可能导致程序崩溃或未定义行为。',
        correct_code: `
          int arr[5] = {1, 2, 3, 4, 5};
          for (int i = 0; i < 5; i++) {
            printf("%d ", arr[i]);
          }
        `,
        Type: 'C',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '空指针引用',
        code: `
          String str = null;
          System.out.println(str.length());  // 空指针引用
        `,
        reason: '尝试访问空对象的属性或方法，会导致程序抛出异常。',
        correct_code: `
          String str = "Hello";
          System.out.println(str.length());
        `,
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '拼写错误',
        code: `
          public void printMessage() {
            System.out.println("Hello, world");
          }
          public static void main(String[] args) {
            printMessagee();  // 方法名拼写错误
          }
        `,
        reason: '方法名拼写错误，导致编译器无法找到对应的方法。',
        correct_code: `
          public void printMessage() {
            System.out.println("Hello, world");
          }
          public static void main(String[] args) {
            printMessage();  // 修正拼写
          }
        `,
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '未捕获异常',
        code: `
          int result = 10 / 0;  // 除以零
        `,
        reason: '除以零会导致程序抛出异常，未捕获异常会导致程序崩溃。',
        correct_code: `
          try {
            int result = 10 / 0;
          } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero");
          }
        `,
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '逻辑错误',
        code: `
          for (int i = 0; i <= 10; i++) {
            if (i % 2 == 0) {
              System.out.println(i + " is odd");  // 逻辑错误
            }
          }
        `,
        reason: '逻辑错误导致输出结果与预期不符，程序运行无误但结果错误。',
        correct_code: `
          for (int i = 0; i <= 10; i++) {
            if (i % 2 == 0) {
              System.out.println(i + " is even");
            }
          }
        `,
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '循环条件错误',
        code: `
          for (int i = 0; i < 10; i--) {  // 循环条件错误
            System.out.println(i);
          }
        `,
        reason: '循环条件错误导致无限循环或未执行循环体。',
        correct_code: `
          for (int i = 0; i < 10; i++) {  // 修正循环条件
            System.out.println(i);
          }
        `,
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '类型转换错误',
        code: `
          int x = 10;
          double y = x / 2;  // 类型转换错误
        `,
        reason: '整数除法结果为整数，未正确转换为浮点数，导致结果不准确。',
        correct_code: `
          int x = 10;
          double y = x / 2.0;  // 使用浮点数进行除法
        `,
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '未关闭资源',
        code: `
          FileInputStream fis = new FileInputStream("file.txt");
          fis.read();  // 未关闭文件流
        `,
        reason: '未关闭资源可能导致资源泄漏，影响系统性能或导致程序崩溃。',
        correct_code: `
          FileInputStream fis = new FileInputStream("file.txt");
          try {
            fis.read();
          } finally {
            fis.close();  // 关闭资源
          }
        `,
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '未处理返回值',
        code: `
          int result = someFunction();
          System.out.println("Function executed");  // 未处理返回值
        `,
        reason: '未处理函数返回值可能导致程序逻辑不完整或错误。',
        correct_code: `
          int result = someFunction();
          if (result == 0) {
            System.out.println("Function executed successfully");
          } else {
            System.out.println("Function failed");
          }
        `,
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('CommonErrors', null, {});
  }
};
