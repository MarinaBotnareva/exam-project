const { CUSTOMER, CREATOR } = require('../constants')

module.exports = {
  up  : function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Users', 'role', {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Roles',
          key: 'name',
      },
      });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface
      .changeColumn('Users', 'role', {
        type: Sequelize.ENUM( CUSTOMER, CREATOR ),
        allowNull: false
      });
  }
};
