/** @format */
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ExtraCommentImages", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      commentId: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
      },
      image: {
        allowNull: false,
        type: Sequelize.BLOB("long"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ExtraCommentImages");
  },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
