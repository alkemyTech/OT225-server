'use strict';

//@ts-check

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Activities.init({
    /**
 *  Name of each activity 
 * @type {string}
*/
    name: DataTypes.STRING,
    /**
     *  Description of each activity
     * @type {string}
    */
    content: DataTypes.TEXT,
    /**
 *  Url image of each activity
 * @type {string}
*/
    image: DataTypes.STRING,
    /**
 *  Date the activity was deleted
 * @type {Date}
*/
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Activities',
    paranoid: true
  });
  return Activities;
};