/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Commenter extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // define association here
                  // Commenter.belongsTo(models.Location, { foreignKey: "idLocation" });
            }
      }
      Commenter.init(
            {},
            {
                  sequelize,
                  modelName: "Commenter",
            },
      );
      return Commenter;
};
