/** @format */
"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Requests", {
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			idRequesterUser: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			idRequestedUser: {
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
				await queryInterface.dropTable("Requests");
	},
};

// npx sequelize-cli db:migrate --to migration-create-request.js
