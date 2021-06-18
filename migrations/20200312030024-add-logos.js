module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface
      .addColumn('Resources', 'logo', Sequelize.STRING, {
        allowNull: true,
        defaultValue: null,
      })
      .then(() =>
        queryInterface.addColumn('Forms', 'logo', Sequelize.STRING, {
          allowNull: true,
          defaultValue: null,
        })
      ),
  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('Resources', 'logo').then(() => queryInterface.removeColumn('Forms', 'logo')),
};
