"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      { name: 'Giải pháp thiết kế' },
      { name: 'Công trình công cộng' },
      { name: 'Nhà ở' },
      { name: 'Nội thất' },
      { name: 'Tin tức' },
    ];

    items.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert("categories", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
