'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const architects = [
      {
        name: 'Nguyễn Văn D',
        email: 'nguyenvand@example.com',
        phone: '0123456789',
      },
      {
        name: 'Trần Thị E',
        email: 'tranthie@example.com',
        phone: '0987654321',
      },
      {
        name: 'Lê Văn F',
        email: 'levanf@example.com',
        phone: '0912345678',
      },
    ];

    await queryInterface.bulkInsert('architects', architects, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('architects', null, {});
  },
};
