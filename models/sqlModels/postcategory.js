"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PostCategories extends Model {}

  PostCategories.init({
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'post_id',
      },
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'category_id',
      },
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: "PostCategories",
    tableName: "PostCategories",
    timestamps: false,
  });

  return PostCategories;
};
