'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comments', [
      {
        content: 'Bài viết rất hay!',
        post_id: 1, // Liên kết với post đã tạo
        user_id: 1,
        created_at: new Date(),
      },
      {
        content: 'Tôi đồng ý với ý kiến này.',
        post_id: 1,
        user_id: 2,
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
