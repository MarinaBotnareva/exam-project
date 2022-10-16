'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Offers', 'approved', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Offers', 'approved', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
  });
  }
};

