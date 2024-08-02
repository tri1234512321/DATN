/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class ImageFood extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // ImageFood.belongsTo(models.Allcodes, {
                  //       foreignKey: "positionId",
                  //       targetKey: "keyMap",
                  //       as: "positionData",
                  // });
                  // ImageFood.hasOne(models.Markdown, { foreignKey: "doctorId" });
                  // ImageFood.hasOne(models.Doctor_Infor, { foreignKey: "doctorId" });
                  // ImageFood.hasMany(models.Schedule, { foreignKey: "doctorId", as: "doctorData" });
                  //   ImageFood.hasOne(models.Location, { foreignKey: "id_User" });
            }
      }
      ImageFood.init(
            {
                  idFood: DataTypes.INTEGER,
                  imageFood: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "ImageFood",
            },
      );
      return ImageFood;
};
