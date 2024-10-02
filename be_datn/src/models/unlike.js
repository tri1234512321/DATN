/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unlike extends Model {
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
          // Unlike.belongsTo(models.User, { foreignKey: "id_User" });
          // Unlike.hasMany(models.Device, { foreignKey: "idLocation" });
          // Unlike.hasMany(models.Sensor, { foreignKey: "idLocation" });
    }
  }
  Unlike.init(
    {
      idUser: DataTypes.INTEGER,
      idPost: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Unlike",
    },
  );
  return Unlike;
};