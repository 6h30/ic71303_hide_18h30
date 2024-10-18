"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Một bài viết có thể thuộc về một tác giả
      Post.belongsTo(models.Author, { foreignKey: 'author_id' });
      // Một bài viết có thể thuộc về nhiều thể loại
      Post.belongsToMany(models.Category, {
        through: 'PostCategories',
        foreignKey: 'post_id',
      });
    }
  }

  Post.init({
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    published_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: false,
  });

  return Post;
};
