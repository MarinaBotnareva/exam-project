'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.STRING,
      references: {
        model: 'Roles',
        key: 'name',
    },
    allowNull: false
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.STRING,
      references: {
        model: 'Roles',
        key: 'name',
    },
    allowNull: true
  });
  }
};
