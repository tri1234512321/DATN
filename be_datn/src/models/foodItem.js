/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class FoodItem extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // FoodItem.belongsTo(models.Allcodes, {
                  //       foreignKey: "positionId",
                  //       targetKey: "keyMap",
                  //       as: "positionData",
                  // });
                  // FoodItem.hasOne(models.Markdown, { foreignKey: "doctorId" });
                  // FoodItem.hasOne(models.Doctor_Infor, { foreignKey: "doctorId" });
                  // FoodItem.hasMany(models.Schedule, { foreignKey: "doctorId", as: "doctorData" });
                  //   FoodItem.hasOne(models.Location, { foreignKey: "id_User" });
            }
      }
      FoodItem.init(
            {
                  idShop: DataTypes.INTEGER,
                  primaryImage: DataTypes.STRING,
                  foodName: DataTypes.STRING,
                  price: DataTypes.STRING,
                  descFood: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "FoodItem",
            },
      );
      return FoodItem;
};
