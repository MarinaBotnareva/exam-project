module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversations_to_catalogs', {
      catalogId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id',
        primaryKey: true,
      },
      chat: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'conversation_id',
        primaryKey: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('conversations_to_catalogs');
  }
};