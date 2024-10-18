'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postCategories = [
      { post_id: 1, category_id: 1 },
      { post_id: 2, category_id: 2 },
      // Thêm dữ liệu mẫu tại đây
    ];

    await queryInterface.bulkInsert('post_categories', postCategories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('post_categories', null, {});
  },
};
