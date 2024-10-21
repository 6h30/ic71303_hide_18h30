'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('posts');
    if (!tableInfo.author_id) {
      await queryInterface.addColumn('posts', 'author_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'authors',
          key: 'author_id',
        },
        allowNull: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('posts', 'author_id');
  }
};
