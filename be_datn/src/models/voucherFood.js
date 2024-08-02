/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class VoucherFood extends Model {
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
                  // VoucherFood.belongsTo(models.User, { foreignKey: "id_User" });
                  // VoucherFood.hasMany(models.Device, { foreignKey: "idLocation" });
                  // VoucherFood.hasMany(models.Sensor, { foreignKey: "idLocation" });
            }
      }
      VoucherFood.init(
            {
                  idFood: DataTypes.INTEGER,
            },
            {
                  sequelize,
                  modelName: "VoucherFood",
            },
      );
      return VoucherFood;
};
