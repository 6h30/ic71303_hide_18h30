'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        user_id: 1,
        username: 'user1',
        email: 'user1@example.com',
        provider: 'email',
        password: 'hashed_password1', // Sử dụng mã hóa thực tế cho mật khẩu
        resetPasswordToken: null,
        confirmationToken: null,
        confirmed: true,
        blocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        username: 'user2',
        email: 'user2@example.com',
        provider: 'email',
        password: 'hashed_password2',
        resetPasswordToken: null,
        confirmationToken: null,
        confirmed: true,
        blocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        username: 'user3',
        email: 'user3@example.com',
        provider: 'google',
        password: 'hashed_password3',
        resetPasswordToken: null,
        confirmationToken: null,
        confirmed: true,
        blocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
