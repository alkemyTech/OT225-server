'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slides extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Slides.belongsTo(models.Organization, { as: 'organization' })
    }
  };
  Slides.init({
    /**
*  Image URL of each slide 
* @type {string}
*/
    imageUrl: DataTypes.STRING,
    /**
*  Text of each slide 
* @type {string}
*/
    text: DataTypes.STRING,
    /**
*  Order of each slide 
* @type {integer}
*/
    order: DataTypes.INTEGER,
    /**
*  Association with an Organization (id)
* @type {integer}
*/
    organizationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Slides',
  });
  return Slides;
};