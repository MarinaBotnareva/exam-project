const { CUSTOMER, CREATOR, MODERATOR } = require('../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role1');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'role1', Sequelize.ENUM(CUSTOMER, CREATOR, MODERATOR));
  }
};