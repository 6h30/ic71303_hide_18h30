'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('projects', [
      {
        project_id: 1,
        title: 'Dự Án Kiến Trúc A',
        slug: 'du-an-kien-truc-a', // Thêm slug
        completion_year: 2023,
        summary: 'Một dự án kiến trúc đột phá.',
        location: 'Hà Nội',
        image_url: 'http://example.com/image_a.jpg',
        customer_id: 1,
        seo: JSON.stringify({
          metaTitle: 'Dự Án Kiến Trúc A',
          metaDescription: 'Khám phá dự án kiến trúc A với thiết kế hiện đại.',
          metaImage: 'http://example.com/meta_image_a.jpg',
          keywords: 'kiến trúc, dự án, Hà Nội',
          metaRobots: 'index, follow',
          structuredData: {},
          canonicalURL: 'http://example.com/du-an-kien-truc-a',
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        project_id: 2,
        title: 'Dự Án Kiến Trúc B',
        slug: 'du-an-kien-truc-b', // Thêm slug
        completion_year: 2024,
        summary: 'Một dự án khác nổi bật.',
        location: 'Đà Nẵng',
        image_url: 'http://example.com/image_b.jpg',
        customer_id: 2,
        seo: JSON.stringify({
          metaTitle: 'Dự Án Kiến Trúc B',
          metaDescription: 'Dự án kiến trúc B với thiết kế sang trọng.',
          metaImage: 'http://example.com/meta_image_b.jpg',
          keywords: 'kiến trúc, dự án, Đà Nẵng',
          metaRobots: 'index, follow',
          structuredData: {},
          canonicalURL: 'http://example.com/du-an-kien-truc-b',
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('projects', null, {});
  },
};
