/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("SecondImageFood", {
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
                  SecondImageFood: {
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
            await queryInterface.dropTable("SecondImageFood");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
