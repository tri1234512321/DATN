/** @format */

// /** @format */

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("foodsystem", "postgres", "Khactoanbkhcm1", {
//       host: "localhost",
//       dialect: "postgres",
//       user: "postgres",
//       password: "rootUser",
//       port: "5544",
//       logging: false,
// });

// let connectDB = async () => {
//       try {
//             await sequelize.authenticate();
//             console.log("Connection has been established successfully.");
//       } catch (error) {
//             console.error("Unable to connect to the database:", error);
//       }
// };

// module.exports = connectDB;
/** @format */

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("foodSystem", "root", null, {
      host: "localhost",
      dialect: "mysql",
      logging: false,
});

let connectDB = async () => {
      try {
            await sequelize.authenticate();
            console.log("Connection has been established successfully.");
      } catch (error) {
            console.error("Unable to connect to the database:", error);
      }
};

module.exports = connectDB;
