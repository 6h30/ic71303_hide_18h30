'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cập nhật author_id cho các bài viết
    await queryInterface.bulkUpdate('posts', 
      { author_id: 1 }, // Trường cần cập nhật
      { post_id: [1, 2, 3] } // Điều kiện để xác định các bản ghi cần cập nhật (thay đổi ID theo yêu cầu)
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Quay lại giá trị ban đầu (nếu cần)
    await queryInterface.bulkUpdate('posts', 
      { author_id: null }, // Đặt lại author_id (nếu cần)
      { post_id: [1, 2, 3] } // Điều kiện quay lại
    );
  }
};
