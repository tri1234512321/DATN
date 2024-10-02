/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    static associate(models) {}
  }
  Shop.init(
    {
      idShop: DataTypes.INTEGER,
      imageShop: DataTypes.STRING,
      introduction: DataTypes.TEXT,
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shop",
    }
  );
  return Shop;
};
