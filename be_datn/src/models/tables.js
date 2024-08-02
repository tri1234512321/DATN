/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Table extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            // static associate(models) {
            //       // define association here
            //       Table.belongsTo(models.Location, { foreignKey: "idLocation" });
            // }
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
