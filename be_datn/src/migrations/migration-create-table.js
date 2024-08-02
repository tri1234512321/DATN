/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Tables", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  idShop: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  width: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  height: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  axisX: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  axisY: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  images: {
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
            await queryInterface.dropTable("Tables");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
