
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversations_to_users', {
      partiсipant: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
        primaryKey: true,
      },
      conversationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'conversation_id',
        primaryKey: true,
      },
      blackList: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      favoriteList:  {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('conversations_to_users');
  }
};