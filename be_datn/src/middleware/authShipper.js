/** @format */

import JWTAction from "./JWTAction";
require("dotenv").config();
const authShipper = (req, res, next) => {
  // console.log("req.body", req.body);
  let access_token = "";

  let access_token1 = req.body.access_token;
  let access_token2 = req.query.access_token;
  // console.log("access_token1: ", access_token1);
  // console.log("access_token2: ", access_token2);

  if (access_token1) {
    access_token = access_token1;
  }
  if (access_token2) {
    access_token = access_token2;
  }
  if (access_token) {
    let decoded = JWTAction.verifyToken(access_token);
    if (decoded) {
      if (decoded.roleId === "SHIPPER") {
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
  authShipper: authShipper,
};
