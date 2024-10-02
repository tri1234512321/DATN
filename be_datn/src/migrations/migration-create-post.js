/** @format */
"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Posts", {
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
			descPost: {
				allowNull: false,
				type: Sequelize.STRING,
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
				await queryInterface.dropTable("Posts");
	},
};

// npx sequelize-cli db:migrate --to migration-create-post.js
