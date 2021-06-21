const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Questionnaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Questionnaire.hasMany(models.Question);
    }
  }
  Questionnaire.init(
    {
      title: DataTypes.STRING,
      explanation: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Questionnaire',
    }
  );
  return Questionnaire;
};

// prompt str
// answet_type str
// questionnaire_type str

// row; q_id, real_type, int, bool, string

// first table
// row; realq_id, answer_id, answert_table
// one table for each type (string, bool, int)
