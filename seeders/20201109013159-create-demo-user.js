'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'User1',
        lastName: 'Test1',
        email: 'test1@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User2',
        lastName: 'Test2',
        email: 'test2@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User3',
        lastName: 'Test3',
        email: 'test3@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User4',
        lastName: 'Test4',
        email: 'test4@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User5',
        lastName: 'Test5',
        email: 'test5@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User6',
        lastName: 'Test6',
        email: 'test6@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User7',
        lastName: 'Test7',
        email: 'test7@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User8',
        lastName: 'Test8',
        email: 'test8@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User9',
        lastName: 'Test9',
        email: 'test9@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User10',
        lastName: 'Test10',
        email: 'test10@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User11',
        lastName: 'Test11',
        email: 'test11@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 2,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User12',
        lastName: 'Test12',
        email: 'test12@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 2,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User13',
        lastName: 'Test13',
        email: 'test13@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 2,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User14',
        lastName: 'Test14',
        email: 'test14@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 2,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User15',
        lastName: 'Test15',
        email: 'test15@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 2,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User16',
        lastName: 'Test16',
        email: 'test16@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 2,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User17',
        lastName: 'Test17',
        email: 'test17@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 2,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User18',
        lastName: 'Test18',
        email: 'test18@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 2,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User19',
        lastName: 'Test19',
        email: 'test19@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 2,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'User20',
        lastName: 'Test20',
        email: 'test20@test.com',
        // Important: Password not encrypted yet! 
        password: '12345678',
        roleId: 2,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
