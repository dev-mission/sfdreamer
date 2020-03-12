'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    phone: DataTypes.STRING,
    contactperson: DataTypes.STRING,
    orgtype: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {});
  Resource.associate = function(models) {
    // associations can be defined here
  };
  return Resource;
};
