'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const milestones = [
      {
        milestone_date: new Date('2022-01-15'),
        description: 'Khởi công dự án cầu A.',
        project_id: 1, // Liên kết với dự án đã tạo
      },
      {
        milestone_date: new Date('2022-06-30'),
        description: 'Hoàn thành phần thô dự án cầu A.',
        project_id: 1,
      },
      {
        milestone_date: new Date('2023-03-10'),
        description: 'Bàn giao dự án nhà B.',
        project_id: 2, // Liên kết với dự án nhà B
      },
      {
        milestone_date: new Date('2024-02-20'),
        description: 'Hoàn thiện tòa nhà văn phòng C.',
        project_id: 3, // Liên kết với dự án văn phòng C
      },
    ];

    milestones.forEach((milestone) => {
      milestone.createdAt = Sequelize.literal("NOW()");
      milestone.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert('milestones', milestones, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('milestones', null, {});
  },
};
