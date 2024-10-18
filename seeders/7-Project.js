'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const projects = [
      {
        title: 'Dự án Cầu A',
        completion_year: 2022,
        summary: 'Dự án cầu hiện đại với thiết kế bền vững.',
        location: 'Hà Nội, Việt Nam',
        image_url: 'http://example.com/image_project_a.jpg',
        architect_id: 1, // Liên kết với kiến trúc sư đã tạo
        customer_id: 1, // Liên kết với khách hàng đã tạo
      },
      {
        title: 'Dự án Nhà B',
        completion_year: 2023,
        summary: 'Nhà ở dân dụng với tiện ích đầy đủ.',
        location: 'Đà Nẵng, Việt Nam',
        image_url: 'http://example.com/image_project_b.jpg',
        architect_id: 2,
        customer_id: 2,
      },
      {
        title: 'Dự án Văn phòng C',
        completion_year: 2024,
        summary: 'Tòa nhà văn phòng hiện đại.',
        location: 'TP.HCM, Việt Nam',
        image_url: 'http://example.com/image_project_c.jpg',
        architect_id: 3,
        customer_id: 3,
      },
    ];

    projects.forEach((project) => {
      project.createdAt = Sequelize.literal("NOW()");
      project.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert('projects', projects, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('projects', null, {});
  },
};
