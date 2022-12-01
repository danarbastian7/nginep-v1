"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Properties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Properties.belongsTo(models.Cities)
      Properties.belongsTo(models.Categories)
      Properties.hasMany(models.PropertyItems)
      Properties.hasMany(models.PropertyFacilities)
      Properties.hasMany(models.PropertyImages, { onDelete: "CASCADE" })
      Properties.belongsTo(models.User)
    }
  }
  Properties.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Properties",
    }
  )
  return Properties
}
