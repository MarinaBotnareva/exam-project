module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversations_to_users', {
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      ConversationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'conversations',
          key: 'id'
        }
      },
      blackList: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      favoriteList:  {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('conversations_to_users');
  }
};
