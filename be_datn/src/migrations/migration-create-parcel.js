/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Parcels", {
                  id: {
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                        type: Sequelize.INTEGER,
                  },
                  idShipper: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  idOrder: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  idShop: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  pickUpTime: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  totalMoney: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  status: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  totalAmount: {
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
            await queryInterface.dropTable("Parcels");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
