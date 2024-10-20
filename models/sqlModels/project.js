"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.Architect, { foreignKey: 'architect_id' });
      Project.hasMany(models.Milestone, { foreignKey: 'project_id' });
      Project.belongsTo(models.Customer, { foreignKey: 'customer_id' }); 
    }
  }

  Project.init({
    project_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    completion_year: {
      type: DataTypes.INTEGER,
    },
    summary: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'customer_id',
      },
    },
    seo: {
      type: DataTypes.JSON,
    },
  }, {
    sequelize,
    modelName: "Project",
    tableName: "projects",
    timestamps: true, // Thêm timestamps để tự động quản lý createdAt và updatedAt
  });

  return Project;
};
