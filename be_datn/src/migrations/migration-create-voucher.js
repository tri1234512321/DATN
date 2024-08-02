/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Vouchers", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  status: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  typeVoucher: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  discount: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  startTime: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  endTime: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  timeApplied: {
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
            await queryInterface.dropTable("Vouchers");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
