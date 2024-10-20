"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
      // Một tác giả có thể viết nhiều bài viết
      Author.hasMany(models.Post, { foreignKey: 'author_id' });
      // Một tác giả là một người dùng
      Author.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Author.init({
    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: "Author",
    tableName: "authors",
    timestamps: false,
  });

  return Author;
};
