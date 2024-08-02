/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class ParcelItem extends Model {
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
                  // ParcelItem.belongsTo(models.User, { foreignKey: "id_User" });
                  // ParcelItem.hasMany(models.Device, { foreignKey: "idLocation" });
                  // ParcelItem.hasMany(models.Sensor, { foreignKey: "idLocation" });
            }
      }
      ParcelItem.init(
            {
                  idParcel: DataTypes.INTEGER,
                  idFood: DataTypes.INTEGER,
                  price: DataTypes.STRING,
                  amount: DataTypes.INTEGER,
            },
            {
                  sequelize,
                  modelName: "ParcelItem",
            },
      );
      return ParcelItem;
};
