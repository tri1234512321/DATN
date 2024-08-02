/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Buyer extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // Buyer.belongsTo(models.Allcodes, {
                  //       foreignKey: "positionId",
                  //       targetKey: "keyMap",
                  //       as: "positionData",
                  // });
                  // Buyer.hasOne(models.Markdown, { foreignKey: "doctorId" });
                  // Buyer.hasOne(models.Doctor_Infor, { foreignKey: "doctorId" });
                  // Buyer.hasMany(models.Schedule, { foreignKey: "doctorId", as: "doctorData" });
                  // Buyer.hasOne(models.Location, { foreignKey: "id_User" });
            }
      }
      Buyer.init(
            {},
            {
                  sequelize,
                  modelName: "Buyer",
            },
      );
      return Buyer;
};
