"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // Một khách hàng có thể có nhiều dự án
      Customer.hasMany(models.Project, { foreignKey: 'customer_id' });
    }
  }

  Customer.init({
    customer_id: {
      type: DataTypes.INTEGER,
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
    address: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: "Customer",
    tableName: "customers",
    timestamps: false,
  });

  return Customer;
};
