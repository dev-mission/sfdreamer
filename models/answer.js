'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    value: DataTypes.STRING,
    next_question: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
  };
  return Answer;
};