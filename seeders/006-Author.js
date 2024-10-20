'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authors = [
      {
        author_id: 1,
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        user_id: 1,
      },
      {
        author_id: 2,
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        user_id: 2,
      },
      {
        author_id: 3,
        name: 'Lê Thị C',
        email: 'lethic@example.com',
        user_id: 3,
      },
    ];

    await queryInterface.bulkInsert('authors', authors, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('authors', null, {});
  },
};
