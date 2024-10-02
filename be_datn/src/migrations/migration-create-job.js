/** @format */
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Jobs", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      idAdmin: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      typeWork: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      slot: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      occupant: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      hourlyWage: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      startTime: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      endTime: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      status: {
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
    await queryInterface.dropTable("Jobs");
  },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
