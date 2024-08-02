/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Carts", {
                  id: {
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                        type: Sequelize.INTEGER,
                  },
                  idBuyer: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  idShop: {
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
            await queryInterface.dropTable("Carts");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
