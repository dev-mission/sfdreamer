'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    prompt: DataTypes.STRING,
    answer_type: DataTypes.STRING,
    questionnaire_type: DataTypes.STRING,
    step: DataTypes.INTEGER,
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};