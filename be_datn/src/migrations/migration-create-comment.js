/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Comments", {
                  id: {
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                        type: Sequelize.INTEGER,
                  },
                  idUserSend: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  idUserReceive: {
                        allowNull: true,
                        type: Sequelize.INTEGER,
                  },
                  idPost: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  idFood: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  content: {
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
            await queryInterface.dropTable("Comments");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
