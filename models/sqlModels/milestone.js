"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Milestone extends Model {
    static associate(models) {
      // Một mốc thời gian thuộc về một dự án
      Milestone.belongsTo(models.Project, { foreignKey: 'project_id' });
    }
  }

  Milestone.init({
    milestone_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    milestone_date: {
      type: DataTypes.DATE,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: "Milestone",
    tableName: "milestones",
    timestamps: true,
  });

  return Milestone;
};
