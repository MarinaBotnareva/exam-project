module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversations_to_catalogs', {
      CatalogId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'catalogs',
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('conversations_to_catalogs');
  }
};