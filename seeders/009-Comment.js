"use strict";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comments', [
      {
        comment_id: 1,
        content: "Bình luận đầu tiên về bài viết số 1.",
        post_id: 1,  // Giả định bài viết với post_id 1 đã tồn tại
        user_id: 1,  // Giả định người dùng với user_id 1 đã tồn tại
        parent_comment_id: null,  // Đây là bình luận gốc, không có bình luận cha
        created_at: new Date(),
      },
      { 
        comment_id: 2,
        content: "Đây là phản hồi cho bình luận đầu tiên.",
        post_id: 1,
        user_id: 2,  // Giả định người dùng với user_id 2 đã tồn tại
        parent_comment_id: 1,  // Bình luận này là phản hồi cho comment_id 1
        created_at: new Date(),
      },
      {
        comment_id: 3,
        content: "Bình luận khác cho bài viết số 2.",
        post_id: 2,  // Giả định bài viết với post_id 2 đã tồn tại
        user_id: 3,  // Giả định người dùng với user_id 3 đã tồn tại
        parent_comment_id: null,
        created_at: new Date(),
      },
      {
        comment_id: 4,
        content: "Phản hồi cho bình luận về bài viết số 2.",
        post_id: 2,
        user_id: 1,
        parent_comment_id: 3,  // Phản hồi cho comment_id 3
        created_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
