'use strict';
module.exports = (sequelize, DataTypes) => {
  const Questionnaire = sequelize.define('Questionnaire', {
    title: DataTypes.STRING,
    explanation: DataTypes.TEXT
  }, {});
  Questionnaire.associate = function(models) {
    // associations can be defined here
  };
  return Questionnaire;
};