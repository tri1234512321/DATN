/** @format */
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Users", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  firstName: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  lastName: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  roleId: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  gender: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  email: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  password: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  description: {
                        allowNull: true,
                        type: Sequelize.STRING,
                  },
                  address: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  phoneNumber: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  image: {
                        allowNull: true,
                        type: Sequelize.BLOB("long"),
                  },
                  bankAccount: {
                        allowNull: true,
                        type: Sequelize.STRING,
                  },
                  momo: {
                        allowNull: true,
                        type: Sequelize.STRING,
                  },
                  enable: {
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
            await queryInterface.dropTable("Users");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
