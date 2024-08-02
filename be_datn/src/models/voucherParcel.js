/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class VoucherParcel extends Model {
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
                  // VoucherParcel.belongsTo(models.User, { foreignKey: "id_User" });
                  // VoucherParcel.hasMany(models.Device, { foreignKey: "idLocation" });
                  // VoucherParcel.hasMany(models.Sensor, { foreignKey: "idLocation" });
            }
      }
      VoucherParcel.init(
            {
                  idParcel: DataTypes.INTEGER,
            },
            {
                  sequelize,
                  modelName: "VoucherParcel",
            },
      );
      return VoucherParcel;
};
