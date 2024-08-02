/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class User extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // User.belongsTo(models.Allcodes, {
                  //       foreignKey: "positionId",
                  //       targetKey: "keyMap",
                  //       as: "positionData",
                  // });
                  // User.hasOne(models.Markdown, { foreignKey: "doctorId" });
                  // User.hasOne(models.Doctor_Infor, { foreignKey: "doctorId" });
                  // User.hasMany(models.Schedule, { foreignKey: "doctorId", as: "doctorData" });
                  // User.hasOne(models.Location, { foreignKey: "id_User" });
            }
      }
      User.init(
            {
                  firstName: DataTypes.STRING,
                  lastName: DataTypes.STRING,
                  roleId: DataTypes.STRING,
                  gender: DataTypes.STRING,
                  email: DataTypes.STRING,
                  password: DataTypes.STRING,
                  description: DataTypes.STRING,
                  address: DataTypes.STRING,
                  phoneNumber: DataTypes.STRING,
                  image: DataTypes.STRING,
                  bankAccount: DataTypes.STRING,
                  momo: DataTypes.STRING,
                  enable: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "User",
            },
      );
      return User;
};
