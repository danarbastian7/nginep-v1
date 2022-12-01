"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class PropertyImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyImages.belongsTo(models.Properties, { onDelete: "CASCADE" })
    }
  }
  PropertyImages.init(
    {
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PropertyImages",
    }
  )
  return PropertyImages
}
