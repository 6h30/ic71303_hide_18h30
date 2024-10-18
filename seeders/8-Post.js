'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('posts', [
      {
        title: 'Dự Án Kiến Trúc A',
        slug: 'du-an-kien-truc-a', // Thêm slug
        content: 'Đây là một dự án kiến trúc nổi bật.',
        image: 'http://example.com/image_a.jpg',
        seo: JSON.stringify({
          metaTitle: 'Dự Án Kiến Trúc A',
          metaDescription: 'Một mô tả ngắn về Dự Án Kiến Trúc A.',
          metaImage: 'http://example.com/meta_image_a.jpg',
          keywords: 'kiến trúc, dự án, nổi bật',
          metaRobots: 'index, follow',
          structuredData: {},
          canonicalURL: 'http://example.com/du-an-kien-truc-a',
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Dự Án Kiến Trúc B',
        slug: 'du-an-kien-truc-b', // Thêm slug
        content: 'Một dự án khác rất thú vị.',
        image: 'http://example.com/image_b.jpg',
        seo: JSON.stringify({
          metaTitle: 'Dự Án Kiến Trúc B',
          metaDescription: 'Một mô tả ngắn về Dự Án Kiến Trúc B.',
          metaImage: 'http://example.com/meta_image_b.jpg',
          keywords: 'kiến trúc, dự án, thú vị',
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
    await queryInterface.bulkDelete('posts', null, {});
  },
};
