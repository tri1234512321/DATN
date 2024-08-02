/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Shift extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // define association here
                  // Shift.belongsTo(models.Location, { foreignKey: "idLocation" });
            }
      }
      Shift.init(
            {
                  idJob: DataTypes.INTEGER,
                  idShipper: DataTypes.INTEGER,
                  hourlyWage: DataTypes.STRING,
                  date: DataTypes.STRING,
                  startShift: DataTypes.STRING,
                  endShift: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "Shift",
            },
      );
      return Shift;
};
