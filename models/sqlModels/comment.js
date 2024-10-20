"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
      Comment.belongsTo(models.User, { foreignKey: 'user_id' });
      // Một bình luận có thể có nhiều bình luận con
      Comment.hasMany(models.Comment, { 
        foreignKey: 'parent_comment_id',
        as: 'replies' // Đặt alias cho các bình luận con
      });
    }
  }

  Comment.init({
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'post_id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    parent_comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comments',
        key: 'comment_id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: false,
  });

  return Comment;
};
