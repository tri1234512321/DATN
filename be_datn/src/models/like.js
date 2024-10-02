/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
          // define association here
          // // Markdown.hasMany(models.Doctor_Infor, { foreignKey: "doctorId", as: "priceTypeData" });
          // Markdown.belongsTo(models.Doctor_Infor, { foreignKey: "doctorId" });
          // Markdown.belongsTo(models.User, { foreignKey: "doctorId" });
          // Like.belongsTo(models.User, { foreignKey: "id_User" });
          // Like.hasMany(models.Device, { foreignKey: "idLocation" });
          // Like.hasMany(models.Sensor, { foreignKey: "idLocation" });
    }
  }
  Like.init(
    {
      idUser: DataTypes.INTEGER,
      idPost: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
    },
  );
  return Like;
};