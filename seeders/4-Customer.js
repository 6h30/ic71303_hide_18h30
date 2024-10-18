'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const customers = [
      {
        name: 'Công ty TNHH A',
        email: 'contact@companyA.com',
        phone: '0123456789',
        address: '123 Đường ABC, Hà Nội',
      },
      {
        name: 'Công ty TNHH B',
        email: 'contact@companyB.com',
        phone: '0987654321',
        address: '456 Đường XYZ, Đà Nẵng',
      },
      {
        name: 'Công ty TNHH C',
        email: 'contact@companyC.com',
        phone: '0912345678',
        address: '789 Đường LMN, TP.HCM',
      },
    ];

    customers.forEach((customer) => {
      customer.createdAt = Sequelize.literal("NOW()");
      customer.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert('customers', customers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', null, {});
  },
};
