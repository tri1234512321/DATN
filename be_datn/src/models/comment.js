"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.hasMany(models.ExtraCommentImage, {
        foreignKey: "commentId",
        as: "extraCommentImages",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      // Comment thuộc về User
      Comment.belongsTo(models.User, {
        foreignKey: "idUserSend",
        as: "user",
      });

      // Comment thuộc về Rate
      Comment.belongsTo(models.Rate, {
        foreignKey: "rateId",
        as: "rate",
      });
    }
  }

  Comment.init(
    {
      idUserSend: DataTypes.INTEGER,
      rateId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      idPost: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );

  return Comment;
};
