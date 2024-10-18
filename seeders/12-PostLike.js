'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postLikes = [
      { post_id: 1, user_id: 1 },
      { post_id: 2, user_id: 2 },
      // Thêm dữ liệu mẫu tại đây
    ];

    await queryInterface.bulkInsert('post_likes', postLikes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('post_likes', null, {});
  },
};
