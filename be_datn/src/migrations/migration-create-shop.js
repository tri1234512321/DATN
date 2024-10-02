/** @format */
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Shops", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      idShop: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      imageShop: {
        allowNull: true,
        type: Sequelize.BLOB("long"),
      },
      introduction: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      startTime: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      endTime: {
        allowNull: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Shops");
  },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
