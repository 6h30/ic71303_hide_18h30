'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const commentLikes = [
      { comment_id: 1, user_id: 1 },
    ];

    await queryInterface.bulkInsert('comment_likes', commentLikes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comment_likes', null, {});
  },
};
