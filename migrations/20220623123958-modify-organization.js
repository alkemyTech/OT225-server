'use strict';

const { query } = require("express");

module.exports = {
  /**
 * @param {QueryInterface} queryInterface 
 * @param {Sequelize} Sequelize 
 * @returns 
 */
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      /** 
       * Facebook contact url
       * @type {string}
      */
      queryInterface.addColumn(
        'Organizations', //table name
        'url_facebook', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
      }),
      /** 
       * LinkedIn contact url
       * @type {string}
      */
      queryInterface.addColumn(
        'Organizations', //table name
        'url_linkedin', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
      }),
      /** 
       * Instagram contact url
       * @type {string}
      */
      queryInterface.addColumn(
        'Organizations', //table name
        'url_instagram', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {

  }
};
