"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    static associate(models) {
      Rate.hasMany(models.ExtraRateImage, {
        foreignKey: "rateId",
        as: "extraImages",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      // Rate có nhiều Comment
      Rate.hasMany(models.Comment, {
        foreignKey: "rateId",
        as: "comments",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      // Rate thuộc về User
      Rate.belongsTo(models.User, {
        foreignKey: "idUser",
        as: "user",
      });
    }
  }

  Rate.init(
    {
      idUser: DataTypes.INTEGER,
      idFood: DataTypes.INTEGER,
      rate: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Rate",
      tableName: "Rates", // Đảm bảo tên bảng là "Rates" (số nhiều)
      timestamps: true,
    }
  );

  return Rate;
};
