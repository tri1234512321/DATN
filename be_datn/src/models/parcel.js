/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Parcel extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // define association here
                  // Parcel.belongsTo(models.Location, { foreignKey: "idLocation" });
            }
      }
      Parcel.init(
            {
                  idShipper: DataTypes.INTEGER,
                  idOrder: DataTypes.INTEGER,
                  idShop: DataTypes.INTEGER,
                  pickUpTime: DataTypes.STRING,
                  totalMoney: DataTypes.STRING,
                  status: DataTypes.STRING,
                  totalAmount: DataTypes.INTEGER,
            },
            {
                  sequelize,
                  modelName: "Parcel",
            },
      );
      return Parcel;
};
