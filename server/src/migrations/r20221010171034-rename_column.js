module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn ('Users' , 'role' , 'role1' )
  }
};
