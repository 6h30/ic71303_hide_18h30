"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Một bài viết có thể có nhiều danh mục
      Post.belongsToMany(models.Category, { through: 'PostCategories', foreignKey: 'post_id' });
      // Một bài viết có thể có nhiều bình luận
      Post.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' });
      // Một bài viết có thể có nhiều bài viết liên quan
      Post.belongsToMany(models.Post, { 
        as: 'relatedArticles', 
        through: 'RelatedArticles', 
        foreignKey: 'post_id' 
      });
    }
  }

  Post.init({
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    seo: {
      type: DataTypes.JSON, // Chứa thông tin SEO
    },
    metaTitle: {
      type: DataTypes.STRING,
    },
    metaDescription: {
      type: DataTypes.TEXT,
    },
    metaImage: {
      type: DataTypes.STRING, // Đường dẫn đến hình ảnh
    },
    keywords: {
      type: DataTypes.TEXT,
    },
    metaRobots: {
      type: DataTypes.STRING,
    },
    structuredData: {
      type: DataTypes.JSON, // Dữ liệu cấu trúc
    },
    metaViewport: {
      type: DataTypes.STRING,
    },
    canonicalURL: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT, // Chứa nội dung bài viết
    },
    image: {
      type: DataTypes.STRING, // Đường dẫn đến hình ảnh chính
    },
  }, {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: true, // Thêm timestamps để tự động quản lý createdAt và updatedAt
  });

  return Post;
};
