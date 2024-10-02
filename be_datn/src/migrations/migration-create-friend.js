/** @format */
"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Friends", {
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			idUser: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			idFriendUser: {
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
				await queryInterface.dropTable("Friends");
	},
};

// npx sequelize-cli db:migrate --to migration-create-friend.js
