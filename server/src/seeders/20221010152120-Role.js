const { CUSTOMER, CREATOR, MODERATOR } = require('../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        name: CUSTOMER,
      },
      {
        name: CREATOR,
      },
      {
        name: MODERATOR,
      },
    ], {});
  },

};