'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface
      .addColumn('Resources', 'logo', Sequelize.STRING, {
        allowNull: true,
        defaultValue: null,
      })
      .then(function () {
        return queryInterface.addColumn('Forms', 'logo', Sequelize.STRING, {
          allowNull: true,
          defaultValue: null,
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('Resources', 'logo').then(function () {
      return queryInterface.removeColumn('Forms', 'logo');
    });
  },
};
