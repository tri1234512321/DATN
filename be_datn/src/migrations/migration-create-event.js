/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Events", {
                  id: {
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                        type: Sequelize.INTEGER,
                  },
                  idFood: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  discountEvent: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  startEvent: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  endEvent: {
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
            await queryInterface.dropTable("Events");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
