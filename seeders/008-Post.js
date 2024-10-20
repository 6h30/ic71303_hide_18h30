"use strict";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('posts', [
      {
        post_id: 1,
        seo: JSON.stringify({
          title: "SEO Title 1",
          description: "This is a short description for SEO purposes.",
        }),
        metaTitle: "Meta Title 1",
        metaDescription: "This is the meta description for post 1.",
        metaImage: "https://example.com/images/post1.png",
        keywords: "blog,post,seo",
        metaRobots: "index,follow",
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Structured Data for Post 1",
        }),
        metaViewport: "width=device-width, initial-scale=1",
        canonicalURL: "https://example.com/post1",
        title: "Bài viết số 1",
        description: "Đây là mô tả cho bài viết số 1.",
        slug: "bai-viet-so-1",
        content: "Đây là nội dung chi tiết của bài viết số 1.",
        image: "https://example.com/images/post1-main.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        post_id: 2,
        seo: JSON.stringify({
          title: "SEO Title 2",
          description: "This is another SEO description.",
        }),
        metaTitle: "Meta Title 2",
        metaDescription: "Meta description cho bài viết 2.",
        metaImage: "https://example.com/images/post2.png",
        keywords: "seo,article,post",
        metaRobots: "noindex,nofollow",
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Structured Data for Post 2",
        }),
        metaViewport: "width=device-width, initial-scale=1",
        canonicalURL: "https://example.com/post2",
        title: "Bài viết số 2",
        description: "Mô tả cho bài viết số 2.",
        slug: "bai-viet-so-2",
        content: "Nội dung chi tiết của bài viết số 2.",
        image: "https://example.com/images/post2-main.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        post_id: 3,
        seo: JSON.stringify({
          title: "SEO Title 3",
          description: "SEO for post 3.",
        }),
        metaTitle: "Meta Title 3",
        metaDescription: "Meta description cho bài viết 3.",
        metaImage: "https://example.com/images/post3.png",
        keywords: "meta,description,blog",
        metaRobots: "index,follow",
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Structured Data for Post 3",
        }),
        metaViewport: "width=device-width, initial-scale=1",
        canonicalURL: "https://example.com/post3",
        title: "Bài viết số 3",
        description: "Mô tả cho bài viết số 3.",
        slug: "bai-viet-so-3",
        content: "Nội dung của bài viết số 3.",
        image: "https://example.com/images/post3-main.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
