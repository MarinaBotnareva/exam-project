const { CUSTOMER, CREATOR } = require('../constants')

module.exports = {
  up  : function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'role', {
        type: Sequelize.STRING,
        references: {
          model: 'Roles',
          key: 'name',
      },
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'role'
    );
  }
}