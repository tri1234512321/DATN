/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
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
          // Chat.belongsTo(models.User, { foreignKey: "id_User" });
          // Chat.hasMany(models.Device, { foreignKey: "idLocation" });
          // Chat.hasMany(models.Sensor, { foreignKey: "idLocation" });
    }
  }
  Chat.init(
    {
      idSendedUser: DataTypes.INTEGER,
      idReceivedUser: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Chat",
    },
  );
  return Chat;
};
