/** @format */
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SecondImageFoods", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      idFood: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      idShop: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      desc: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      secondImageFood: {
        allowNull: true,
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
    await queryInterface.dropTable("SecondImageFoods");
  },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
