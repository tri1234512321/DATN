"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExtraRateImage extends Model {
    static associate(models) {
      ExtraRateImage.belongsTo(models.Rate, {
        foreignKey: "rateId",
        as: "rate",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  ExtraRateImage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      rateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Rates", // Đảm bảo tên bảng là "Rates"
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      image: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ExtraRateImage",
      tableName: "ExtraRateImages",
      timestamps: true,
    }
  );

  return ExtraRateImage;
};
