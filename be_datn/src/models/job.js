/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Job.belongsTo(models.Location, { foreignKey: "idLocation" });
    }
  }
  Job.init(
    {
      idAdmin: DataTypes.INTEGER,
      typeWork: DataTypes.STRING,
      slot: DataTypes.INTEGER,
      occupant: DataTypes.INTEGER,
      hourlyWage: DataTypes.STRING,
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
      date: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
