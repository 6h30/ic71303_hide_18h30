"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Architect extends Model {
    static associate(models) {
      // Một kiến trúc sư có thể có nhiều dự án
      Architect.hasMany(models.Project, { foreignKey: 'architect_id' });
    }
  }

  Architect.init({
    architect_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: "Architect",
    tableName: "architects",
    timestamps: false,
  });

  return Architect;
};
