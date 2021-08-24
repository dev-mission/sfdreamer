const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Resource.belongsTo(models.Category);
    }
  }
  Resource.init(
    {
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      logoUrl: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.assetUrl('logo', 'resources/logo');
        },
      },
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
      phone: DataTypes.STRING,
      contactperson: DataTypes.STRING,
      orgtype: DataTypes.STRING,
      email: DataTypes.STRING,
      website: DataTypes.STRING,
      address: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Resource',
    }
  );

  Resource.afterSave(async (resource, options) => {
    resource.handleAssetFile('logo', 'resources/logo', options);
  });

  return Resource;
};
