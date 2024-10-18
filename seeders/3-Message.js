'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('messages', [
      {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        content: 'Xin chào, tôi muốn hỏi về dự án.',
        user_id: 1, // Liên kết với user đã tạo
        created_at: new Date(),
      },
      {
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        content: 'Tôi cần thêm thông tin về giá cả.',
        user_id: 2,
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('messages', null, {});
  },
};
