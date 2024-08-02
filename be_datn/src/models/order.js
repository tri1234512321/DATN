/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Order extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // Order.belongsTo(models.Location, { foreignKey: "idLocation" });
            }
      }
      Order.init(
            {
                  idBuyer: DataTypes.INTEGER,
                  idShipper: DataTypes.INTEGER,
                  timeOrder: DataTypes.STRING,
                  timeDelivery: DataTypes.STRING,
                  realTimeDelivery: DataTypes.STRING,
                  addressDelivery: DataTypes.STRING,
                  totalAmount: DataTypes.INTEGER,
                  totalMoney: DataTypes.STRING,
                  status: DataTypes.STRING,
                  rateShipper: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "Order",
            },
      );
      return Order;
};
