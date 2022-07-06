'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.belongsTo(models.News, {
        foreignKey: 'id',
        targe_tKey: 'news_id'
      })
      Comments.belongsTo(models.User, {
        foreignKey: 'id',
        target_Key: 'user_id'
      })
    }
  };
  Comments.init({
    user_id: DataTypes.INTEGER,
    body: DataTypes.STRING,
    news_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Comments',
    paranoid: true
  });
  return Comments;
};