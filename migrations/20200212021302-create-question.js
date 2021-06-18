module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      prompt: {
        type: Sequelize.STRING,
      },
      answer_type: {
        type: Sequelize.STRING,
      },
      questionnaire_type: {
        type: Sequelize.STRING,
      },
      step: {
        type: Sequelize.INTEGER,
      },
      QuestionnaireId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questionnaires',
          key: 'id',
        },
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Questions'),
};
