'use strict';
module.exports = (sequelize, DataTypes) => {
  const Questionnaire = sequelize.define('Questionnaire', {
    title: DataTypes.STRING,
    explanation: DataTypes.TEXT
  }, {});
  Questionnaire.associate = function(models) {
    // associations can be defined here
    Questionnaire.hasMany(models.Question);
  };
  return Questionnaire;
};


// prompt str
// answet_type str 
// questionnaire_type str




// row; q_id, real_type, int, bool, string

// first table
// row; realq_id, answer_id, answert_table
// one table for each type (string, bool, int)

