/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class VoucherFood extends Model {
            static associate(models) {

            }
      }
      VoucherFood.init(
            {
                  idFood: DataTypes.INTEGER,
                  idVoucher: DataTypes.INTEGER,
                  timeApplied: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "VoucherFood",
            },
      );
      return VoucherFood;
};
