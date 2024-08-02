/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("CartItems", {
                  id: {
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                        type: Sequelize.INTEGER,
                  },
                  idCart: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  idFood: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  amountFood: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  timeAt: {
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
            await queryInterface.dropTable("CartItems");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
