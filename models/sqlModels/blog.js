"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      Blog.belongsTo(models.Category, { foreignKey: "categoryId" });
      Blog.belongsToMany(models.Tag, {
        through: "BlogTag",
        foreignKey: "blogId",
        otherKey: "tagId",
      });
      Blog.belongsTo(models.User, { foreignKey: "authorId" });
      Blog.hasMany(models.Comment, { foreignKey: "blogId" });
    }
  }
  
  Blog.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      imagePath: DataTypes.STRING,
      imageAlt: DataTypes.STRING,
      summary: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Blog",
    }
  );
  return Blog;
};