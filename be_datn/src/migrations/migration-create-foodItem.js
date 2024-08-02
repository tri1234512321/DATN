/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("FoodItems", {
                  id: {
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                        type: Sequelize.INTEGER,
                  },
                  idShop: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  primaryImage: {
                        allowNull: false,
                        type: Sequelize.BLOB("long"),
                  },
                  foodName: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  price: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  descFood: {
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
            await queryInterface.dropTable("FoodItems");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
