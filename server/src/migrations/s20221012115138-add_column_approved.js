module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Offers', 'approved', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }); 
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Offers', 'approved');
  }
};