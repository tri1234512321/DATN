/** @format */
"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Follows", {
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			idFollowerUser: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			idFollowedUser: {
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
				await queryInterface.dropTable("Follows");
	},
};

// npx sequelize-cli db:migrate --to migration-create-follow.js
