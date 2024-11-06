'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('posts', [
        {
          post_id: 4,
          seo: JSON.stringify({
            title: "SEO Title 4",
            description: "This is a short description for SEO purposes.",
          }),
          metaTitle: "Meta Title 4",
          metaDescription: "This is the meta description for post 4.",
          metaImage: "https://example.com/images/post4.png",
          keywords: "blog,post,seo",
          metaRobots: "index,follow",
          structuredData: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Structured Data for Post 4",
          }),
          metaViewport: "width=device-width, initial-scale=4",
          canonicalURL: "https://example.com/post4",
          title: "Bài viết số 4",
          description: "Đây là mô tả cho bài viết số 4.",
          slug: "bai-viet-so-4",
          content: "Đây là nội dung chi tiết của bài viết số 4.",
          image: "https://example.com/images/post4-main.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          post_id: 5,
          seo: JSON.stringify({
            title: "SEO Title 5",
            description: "This is another SEO description.",
          }),
          metaTitle: "Meta Title 5",
          metaDescription: "Meta description cho bài viết 5.",
          metaImage: "https://example.com/images/post5.png",
          keywords: "seo,article,post",
          metaRobots: "noindex,nofollow",
          structuredData: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Structured Data for Post 5",
          }),
          metaViewport: "width=device-width, initial-scale=4",
          canonicalURL: "https://example.com/post5",
          title: "Bài viết số 5",
          description: "Mô tả cho bài viết số 5.",
          slug: "bai-viet-so-5",
          content: "Nội dung chi tiết của bài viết số 5.",
          image: "https://example.com/images/post5-main.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          post_id: 6,
          seo: JSON.stringify({
            title: "SEO Title 6",
            description: "SEO for post 6.",
          }),
          metaTitle: "Meta Title 6",
          metaDescription: "Meta description cho bài viết 6.",
          metaImage: "https://example.com/images/post6.png",
          keywords: "meta,description,blog",
          metaRobots: "index,follow",
          structuredData: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Structured Data for Post 6",
          }),
          metaViewport: "width=device-width, initial-scale=4",
          canonicalURL: "https://example.com/post6",
          title: "Bài viết số 6",
          description: "Mô tả cho bài viết số 6.",
          slug: "bai-viet-so-6",
          content: "Nội dung của bài viết số 6.",
          image: "https://example.com/images/post6-main.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
