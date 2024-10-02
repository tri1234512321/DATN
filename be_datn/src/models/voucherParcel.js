/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class VoucherParcel extends Model {
            static associate(models) {

            }
      }
      VoucherParcel.init(
            {
                  idParcel: DataTypes.INTEGER,
                  idVoucher: DataTypes.INTEGER,
                  timeApplied: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "VoucherParcel",
            },
      );
      return VoucherParcel;
};
