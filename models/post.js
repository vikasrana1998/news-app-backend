'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsToMany(models.Category, {
        through: 'PostCategory', // Name of the relation table
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });

      Post.belongsToMany(models.Tag, {
        through: 'PostTag',
        foreignKey: 'postId',
        otherKey: 'tagId',
      });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    excerpt: DataTypes.TEXT,
    content: DataTypes.TEXT,
    meta_description: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post'
  });
  return Post;
};