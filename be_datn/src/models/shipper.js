/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Shipper extends Model {
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
                  // Shipper.belongsTo(models.User, { foreignKey: "id_User" });
                  // Shipper.hasMany(models.Device, { foreignKey: "idLocation" });
                  // Shipper.hasMany(models.Sensor, { foreignKey: "idLocation" });
            }
      }
      Shipper.init(
            {},
            {
                  sequelize,
                  modelName: "Shipper",
            },
      );
      return Shipper;
};
