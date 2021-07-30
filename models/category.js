'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(Category, { as: 'Parent' });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      summary: DataTypes.TEXT,
      icon: DataTypes.STRING,
      iconUrl: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.assetUrl('icon', 'categories/icon');
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );

  Category.afterSave(async (category, options) => {
    category.handleAssetFile('icon', 'categories/icon', options);
  });

  return Category;
};
