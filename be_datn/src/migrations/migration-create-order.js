/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Orders", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  idBuyer: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  idShipper: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  timeOrder: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  timeDelivery: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  realTimeDelivery: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  addressDelivery: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  totalAmount: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  totalMoney: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  status: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  rateShipper: {
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
            await queryInterface.dropTable("Orders");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
