'use strict';
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    school: DataTypes.STRING,
    url: DataTypes.TEXT,
    lang: DataTypes.STRING
  }, {});
  Form.associate = function(models) {
    // associations can be defined here

  };
  return Form;
};
