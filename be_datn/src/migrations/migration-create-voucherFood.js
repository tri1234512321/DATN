/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("VoucherFoods", {
                  id: {
                        allowNull: false,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  idFood: {
                        allowNull: true,
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
            await queryInterface.dropTable("VoucherFoods");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
