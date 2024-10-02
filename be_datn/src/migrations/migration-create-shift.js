/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Shifts", {
                  id: {
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                        type: Sequelize.INTEGER,
                  },
                  idJob: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  idShipper: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  accepted: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
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
            await queryInterface.dropTable("Shifts");
      },
};

// npx sequelize-cli db:migrate --to migration-create-shift.js
