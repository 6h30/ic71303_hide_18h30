'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('posts', [
      {
        title: 'Dự Án Kiến Trúc A',
        content: 'Đây là một dự án kiến trúc nổi bật.',
        image_url: 'http://example.com/image_a.jpg',
        author_id: 1, // Liên kết với user đã tạo
        created_at: new Date(),
      },
      {
        title: 'Dự Án Kiến Trúc B',
        content: 'Một dự án khác rất thú vị.',
        image_url: 'http://example.com/image_b.jpg',
        author_id: 2,
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
