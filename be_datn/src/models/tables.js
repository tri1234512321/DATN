/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Table extends Model {
      }
      Table.init(
            {
                  idShop: DataTypes.INTEGER,
                  width: DataTypes.STRING,
                  height: DataTypes.STRING,
                  axisX: DataTypes.STRING,
                  axisY: DataTypes.STRING,
                  images: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "Table",
            },
      );
      return Table;
};
