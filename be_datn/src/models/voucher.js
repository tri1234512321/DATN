/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Voucher extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // Voucher.belongsTo(models.Allcodes, {
                  //       foreignKey: "positionId",
                  //       targetKey: "keyMap",
                  //       as: "positionData",
                  // });
                  // Voucher.hasOne(models.Markdown, { foreignKey: "doctorId" });
                  // Voucher.hasOne(models.Doctor_Infor, { foreignKey: "doctorId" });
                  // Voucher.hasMany(models.Schedule, { foreignKey: "doctorId", as: "doctorData" });
                  //   Voucher.hasOne(models.Location, { foreignKey: "id_User" });
            }
      }
      Voucher.init(
            {
                  status: DataTypes.STRING,
                  typeVoucher: DataTypes.STRING,
                  discount: DataTypes.STRING,
                  startTime: DataTypes.STRING,
                  endTime: DataTypes.STRING,
                  timeApplied: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "Voucher",
            },
      );
      return Voucher;
};
