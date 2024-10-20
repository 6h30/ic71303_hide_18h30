"use strict";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('milestones', [
      {
        milestone_date: new Date('2024-01-15'),  // Giả định mốc thời gian của dự án
        description: "Hoàn thành giai đoạn thiết kế.",
        project_id: 1,  // Giả định dự án với project_id 1 đã tồn tại
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        milestone_date: new Date('2024-03-01'),
        description: "Hoàn thành phát triển giao diện.",
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        milestone_date: new Date('2024-05-15'),
        description: "Bắt đầu giai đoạn kiểm thử.",
        project_id: 2,  // Giả định dự án với project_id 2 đã tồn tại
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        milestone_date: new Date('2024-06-30'),
        description: "Phát hành phiên bản đầu tiên.",
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('milestones', null, {});
  }
};
