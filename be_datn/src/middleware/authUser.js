/** @format */

import JWTAction from "./JWTAction";
require("dotenv").config();

const authUser = (req, res, next) => {
      let access_token;
      if (req.query.access_token) {
            access_token = req.query.access_token;
      }
      if (req.body.access_token) {
            access_token = req.body.access_token;
      }
      // console.log("access_token: ", access_token);
      if (access_token) {
            let decoded = JWTAction.verifyToken(access_token);
            if (decoded) {
                  if (
                        decoded.roleId === "ADMIN" ||
                        decoded.roleId === "BUYER" ||
                        decoded.roleId === "SHOP" ||
                        decoded.roleId === "SHIPPER"
                  ) {
                        next();
                  } else {
                        return res.status(401).json({
                              EC: -1,
                              DT: "",
                              EM: "Not authenticated the user",
                        });
                  }
            } else {
                  return res.status(401).json({
                        EC: -2,
                        DT: "",
                        EM: "You do not have access!",
                  });
            }
      } else {
            return res.status(401).json({
                  EC: -2,
                  DT: "",
                  EM: "You do not have access!",
            });
      }
      // console.log("cookies: ", cookies);
};

module.exports = {
      authUser: authUser,
};
