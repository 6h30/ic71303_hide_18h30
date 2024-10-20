"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {
    // Bạn có thể định nghĩa các quan hệ ở đây nếu cần
    static associate(models) {
      PostCategory.belongsTo(models.Post, {
        foreignKey: 'post_id',
        as: 'post'
      });
      PostCategory.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });
    }
  }

  PostCategory.init({
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts', // Kiểm tra xem tên bảng trong cơ sở dữ liệu có phải là 'posts' không
        key: 'post_id',
      },
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories', // Kiểm tra xem tên bảng trong cơ sở dữ liệu có phải là 'categories' không
        key: 'category_id',
      },
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: "PostCategory", // Sử dụng số ít
    tableName: "post_categories", // Đảm bảo tên bảng khớp với cơ sở dữ liệu
    timestamps: false,
  });

  return PostCategory;
};
