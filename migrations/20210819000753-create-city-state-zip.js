'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Resources', 'city', { type: Sequelize.STRING });
    await queryInterface.addColumn('Resources', 'state', { type: Sequelize.STRING });
    await queryInterface.addColumn('Resources', 'zip', { type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Resources', 'city');
    await queryInterface.removeColumn('Resources', 'state');
    await queryInterface.removeColumn('Resources', 'zip');
  },
};
