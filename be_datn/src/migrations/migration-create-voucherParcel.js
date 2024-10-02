/** @format */
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("VoucherParcels", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      idParcel: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      idVoucher: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      timeApplied: {
        allowNull: false,
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
    await queryInterface.dropTable("VoucherParcels");
  },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
