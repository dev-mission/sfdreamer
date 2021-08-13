'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        'Categories',
        'slug',
        {
          type: Sequelize.STRING,
          unique: true,
        },
        { transaction }
      );
      await queryInterface.sequelize.query('UPDATE "Categories" SET slug=id::TEXT', { transaction });
      await queryInterface.changeColumn(
        'Categories',
        'slug',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Categories', 'slug');
  },
};
