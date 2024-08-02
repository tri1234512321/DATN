/** @format */
// idHistory: DataTypes.NUMBER,
//                   firstName: DataTypes.STRING,
//                   lastName: DataTypes.STRING,
//                   gender: DataTypes.STRING,
//                   phoneNumber: DataTypes.STRING,
//                   address: DataTypes.STRING,
//                   image: DataTypes.TEXT("long"),
//                   email: DataTypes.STRING,
//                   password: DataTypes.STRING,
//                   roleId: DataTypes.STRING,
//                   bannkAccount: DataTypes.STRING,
//                   momo: DataTypes.STRING,
"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Buyers", {
                  id: {
                        allowNull: false,
                        primaryKey: true,
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
            await queryInterface.dropTable("Buyers");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
