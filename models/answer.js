module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'Answer',
    {
      value: DataTypes.STRING,
    },
    {}
  );
  Answer.associate = function (models) {
    // associations can be defined here
    Answer.belongsTo(models.Question);
    Answer.belongsTo(models.Question, { as: 'NextQuestion' });
  };
  return Answer;
};
