module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`UPDATE "Users" SET role=role1::text`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`UPDATE "Users" SET role=null`)
  }
};
