'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Members.init({
    facebookUrl: DataTypes.STRING,
    instagramUrl: DataTypes.STRING,
    linkedinUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    deletedAt: DataTypes.DATE,

    /**
     * Name of each Members
     * @type {string}
     */
    name: DataTypes.STRING,
    /**
     * image of each Members
     * @type {string}
     */
    image: DataTypes.STRING,
    //deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Members',
  });
  return Members;
};