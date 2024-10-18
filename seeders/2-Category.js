"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      { name: 'Thiết kế kiến trúc' },
      { name: 'Xây dựng' },
      { name: 'Nội thất' },
      { name: 'Quản lý dự án' },
      { name: 'Phát triển bền vững' },
    ];

    items.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert("Categories", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
