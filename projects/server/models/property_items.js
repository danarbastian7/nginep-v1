"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class PropertyItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyItems.belongsTo(models.Properties)
      PropertyItems.hasMany(models.Images)
    }
  }
  PropertyItems.init(
    {
      item_name: DataTypes.STRING,
      description: DataTypes.TEXT,
      capacity: DataTypes.STRING,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PropertyItems",
    }
  )
  return PropertyItems
}
