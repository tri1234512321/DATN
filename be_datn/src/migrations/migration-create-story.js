/** @format */
"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Stories", {
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
			image: {
				allowNull: false,
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
				await queryInterface.dropTable("Stories");
	},
};

// npx sequelize-cli db:migrate --to migration-create-story.js
