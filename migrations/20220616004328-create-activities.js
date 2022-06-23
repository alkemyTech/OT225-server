'use strict';

//@ts-check

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Activities', {
      /** 
       * Primary and unique key to each activity 
       * @type {integer}
       * */
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      /**
       *  Name of each activity 
       * @type {string}
      */
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      /**
       *  Description of each activity
       * @type {string}
      */
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      /**
       *  Image of each activity
       * @type {string}
      */
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      /**
       *  Date the activity was deleted
       * @type {Date}
      */
      deletedAt: {
        type: Sequelize.DATE
      },
      /**
       *  Date the activity was created
       * @type {Date}
      */
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      /**
       *  Date the activity was updated
       * @type {Date}
      */
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Activities');
  }
};