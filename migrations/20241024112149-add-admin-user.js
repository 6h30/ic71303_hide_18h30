'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
        user_id: 4, 
        username: 'admin4', 
        email: 'hello@omdstudio.art', 
        provider: 'email',
        password: await bcrypt.hash('admin123', 10),
        resetPasswordToken: null,
        confirmationToken: null,
        confirmed: true,
        blocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: 'hello@omdstudio.art'
    }, {});
  }
};
