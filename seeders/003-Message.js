"use strict";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [
      {
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        content: "Tôi có câu hỏi về sản phẩm của bạn.",
        created_at: new Date(),
        responded_at: null,
        status: "đã nhận",
        note: null,
        category: "Hỏi đáp",
        ip_address: "192.168.1.1",
        user_id: null,  // Trường hợp người dùng không đăng ký
        language: "vi",
      },
      {
        name: "John Doe",
        email: "johndoe@example.com",
        content: "I am facing an issue with the website.",
        created_at: new Date(),
        responded_at: new Date(),
        status: "đã phản hồi",
        note: "Đã gửi email trả lời",
        category: "Hỗ trợ kỹ thuật",
        ip_address: "203.0.113.5",
        user_id: 1, // Giả định người dùng đã đăng ký có id là 1
        language: "en",
      },
      {
        name: "Lê Thị B",
        email: "lethib@example.com",
        content: "Tôi muốn yêu cầu hoàn tiền cho đơn hàng #12345.",
        created_at: new Date(),
        responded_at: null,
        status: "đã nhận",
        note: "Cần xem xét đơn hàng",
        category: "Hoàn tiền",
        ip_address: "203.0.113.45",
        user_id: 2, // Giả định người dùng đã đăng ký có id là 2
        language: "vi",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};
