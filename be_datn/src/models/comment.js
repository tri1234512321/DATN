/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Comment extends Model {
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
                  // Comment.belongsTo(models.User, { foreignKey: "id_User" });
                  // Comment.hasMany(models.Device, { foreignKey: "idLocation" });
                  // Comment.hasMany(models.Sensor, { foreignKey: "idLocation" });
            }
      }
      Comment.init(
            {
                  idUserSend: DataTypes.INTEGER,
                  idUserReceive: DataTypes.INTEGER,
                  idPost: DataTypes.INTEGER,
                  idFood: DataTypes.INTEGER,
                  content: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "Comment",
            },
      );
      return Comment;
};
