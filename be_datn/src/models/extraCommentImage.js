"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExtraCommentImage extends Model {
    static associate(models) {
      ExtraCommentImage.belongsTo(models.Comment, {
        foreignKey: "commentId",
        as: "comment",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  ExtraCommentImage.init(
    {
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Comments",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idUserSend: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ExtraCommentImage",
    }
  );

  return ExtraCommentImage;
};
