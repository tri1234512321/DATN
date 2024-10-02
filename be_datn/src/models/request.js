/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Request extends Model {
				/**
				 * Helper method for defining associations.
				 * This method is not a part of Sequelize lifecycle.
				 * The `models/index` file will call this method automatically.
				 */
		static associate(models) {
		}
	}
	Request.init(
		{
			idRequesterUser: DataTypes.INTEGER,
			idRequestedUser: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Request",
		},
	);
	return Request;
};
