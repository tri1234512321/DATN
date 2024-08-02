/** @format */
require("dotenv").config();
const configCors = (app) => {
      app.use(function (req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT,PATCH, DELETE");

            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

            res.setHeader("Access-Control-Allow-Credentials", "true");
            next();
      });
};

module.exports = {
      configCors: configCors,
};
