'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      prompt: DataTypes.STRING,
      answer_type: DataTypes.STRING,
      questionnaire_type: DataTypes.STRING,
      step: DataTypes.INTEGER,
    },
    {}
  );
  Question.associate = function (models) {
    // associations can be defined here
    Question.belongsTo(models.Questionnaire);
    Question.hasMany(models.Answer);
  };
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
