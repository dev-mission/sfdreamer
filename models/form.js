const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Form.init(
    {
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      year: DataTypes.INTEGER,
      school: DataTypes.STRING,
      url: DataTypes.TEXT,
      lang: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Form',
    }
  );
  return Form;
};
