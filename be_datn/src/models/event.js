/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Event extends Model {
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
                  // Event.belongsTo(models.User, { foreignKey: "id_User" });
                  // Event.hasMany(models.Device, { foreignKey: "idLocation" });
                  // Event.hasMany(models.Sensor, { foreignKey: "idLocation" });
            }
      }
      Event.init(
            {
                  idFood: DataTypes.INTEGER,
                  discountEvent: DataTypes.STRING,
                  startEvent: DataTypes.STRING,
                  endEvent: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "Event",
            },
      );
      return Event;
};
