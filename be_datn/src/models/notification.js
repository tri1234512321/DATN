/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Notification extends Model {
				/**
				 * Helper method for defining associations.
				 * This method is not a part of Sequelize lifecycle.
				 * The `models/index` file will call this method automatically.
				 */
		static associate(models) {
		}
	}
	Notification.init(
		{
			idSendedUser: DataTypes.INTEGER,
			idReceivedUser: DataTypes.INTEGER,
      content: DataTypes.STRING,
			seen: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Notification",
		},
	);
	return Notification;
};