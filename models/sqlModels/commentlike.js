"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CommentLike extends Model {
    static associate(models) {
      CommentLike.belongsTo(models.User, { foreignKey: 'user_id' });
      CommentLike.belongsTo(models.Comment, { foreignKey: 'comment_id' });
    }
  }

  CommentLike.init({
    like_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comments',
        key: 'comment_id',
      },
    },
  }, {
    sequelize,
    modelName: "CommentLike",
    tableName: "comment_likes",
    timestamps: false,
  });

  return CommentLike;
};
