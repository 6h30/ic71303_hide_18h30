"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    static associate(models) {
      PostLike.belongsTo(models.User, { foreignKey: 'user_id' });
      PostLike.belongsTo(models.Post, { foreignKey: 'post_id' });
    }
  }

  PostLike.init({
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
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'post_id',
      },
    },
  }, {
    sequelize,
    modelName: "PostLike",
    tableName: "post_likes",
    timestamps: false,
  });

  return PostLike;
};
