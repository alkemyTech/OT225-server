'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Slides', {
      /** 
 * Primary and unique key to each slide 
 * @type {integer}
 * */
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      /**
*  Image URL of each slide 
* @type {string}
*/
      imageUrl: {
        type: Sequelize.STRING
      },
      /**
*  Text of each slide 
* @type {string}
*/
      text: {
        type: Sequelize.STRING
      },
      /**
*  Order of each slide 
* @type {integer}
*/
      order: {
        type: Sequelize.INTEGER
      },
      /**
*  Association with an Organization (id)
* @type {integer}
*/
      organizationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Organizations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Slides');
  }
};