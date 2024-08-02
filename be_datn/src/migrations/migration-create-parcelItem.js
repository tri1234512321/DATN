/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("ParcelItems", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  idParcel: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  idFood: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  price: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  amount: {
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
            await queryInterface.dropTable("ParcelItems");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
