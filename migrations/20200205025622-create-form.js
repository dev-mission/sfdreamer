module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      school: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.TEXT,
      },
      lang: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Forms'),
};
