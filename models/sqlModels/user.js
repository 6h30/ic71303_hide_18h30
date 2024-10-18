"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Một người dùng có thể có nhiều lời nhắn
      User.hasMany(models.Message, { foreignKey: 'user_id', as: 'messages' });
      // Một người dùng có thể có nhiều vai trò
      User.belongsToMany(models.Role, { through: 'UserRoles', foreignKey: 'user_id' });
    }
  }

  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    provider: {
      type: DataTypes.STRING, // Phương thức đăng nhập (email, Google, v.v.)
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING, // Token đặt lại mật khẩu
    },
    confirmationToken: {
      type: DataTypes.STRING, // Token xác thực email
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Mặc định là chưa xác thực
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Mặc định là không bị chặn
    },
  }, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true, // Thêm timestamps để tự động quản lý createdAt và updatedAt
  });

  return User;
};
