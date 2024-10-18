"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Một thể loại có thể có nhiều bài viết
      Category.belongsToMany(models.Post, {
        through: 'PostCategories',
        foreignKey: 'category_id',
      });
    }
  }

  Category.init({
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: false,
  });

  return Category;
};
