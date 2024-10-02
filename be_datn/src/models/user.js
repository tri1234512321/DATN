/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Rate, {
        foreignKey: "id",
        as: "rates",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      // User có nhiều Comment
      User.hasMany(models.Comment, {
        foreignKey: "idUserSend",
        as: "comments",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
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
    }
  );
  return User;
};
