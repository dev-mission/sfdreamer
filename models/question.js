const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.Questionnaire);
      Question.hasMany(models.Answer);
    }
  }
  Question.init(
    {
      prompt: DataTypes.STRING,
      answer_type: DataTypes.STRING,
      questionnaire_type: DataTypes.STRING,
      step: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Question',
    }
  );
  return Question;
};

// edit in migrations file
// ****** migrationfile.js
// ModelId: {
//   type: Sequelize.INTEGER,
//   references: {
//     model: "Models",
//     key: "id",
//   }
// ****** modelfile.js
// ThisModel.belongsTo(models.OtherModel);
// OtherModel.hasMany(models.ThisModel);
// ****** in command line
// undo migrations
// do migrations
//
