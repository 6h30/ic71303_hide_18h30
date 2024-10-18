'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authors = [
      {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        user_id: 1, // Liên kết với user đã đăng ký
      },
      {
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        user_id: 2,
      },
      {
        name: 'Lê Thị C',
        email: 'lethic@example.com',
        user_id: 3,
      },
    ];

    authors.forEach((author) => {
      author.createdAt = Sequelize.literal("NOW()");
      author.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert('authors', authors, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('authors', null, {});
  },
};
