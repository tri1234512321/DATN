/** @format */

import adminService from "../services/adminService";

// import { createJSONToken, parseJwt } from "../utils/auth";
let handleGetAllUsers = async (req, res) => {
      let id = req.query.id;
      if (!id) {
            return res.status(200).json({
                  EC: 1,
                  EM: "Missing parameter",
                  users: [],
            });
      }
      let users = await adminService.getAllUsers(id);
      if (users.EC === 5) {
            return res.status(200).json({
                  EC: 5,
                  EM: "Not authorized",
            });
      }
      return res.status(200).json({
            EC: 0,
            EM: "Ok",
            users: users,
      });
};

let handleGetAllShippers = async (req, res) => {
      let id = req.query.id;
      // let access_token = req.query.access_token;
      if (!id) {
            return res.status(200).json({
                  EC: 1,
                  EM: "Missing parameter",
                  users: [],
            });
      }
      let users = await adminService.getAllShippers(id);
      if (users.EC === 5) {
            return res.status(200).json({
                  EC: 5,
                  EM: "Not authorized",
            });
      }
      return res.status(200).json({
            EC: 0,
            EM: "Ok",
            users: users,
      });
};
let handleGetAllBuyers = async (req, res) => {
      let id = req.query.id;
      // let access_token = req.query.access_token;
      if (!id) {
            return res.status(200).json({
                  EC: 1,
                  EM: "Missing parameter",
                  users: [],
            });
      }
      let users = await adminService.getAllBuyers(id);
      if (users.EC === 5) {
            return res.status(200).json({
                  EC: 5,
                  EM: "Not authorized",
            });
      }
      return res.status(200).json({
            EC: 0,
            EM: "Ok",
            users: users,
      });
};
let handleGetAllShops = async (req, res) => {
      let id = req.query.id;
      if (!id) {
            return res.status(200).json({
                  EC: 1,
                  EM: "Missing parameter",
                  users: [],
            });
      }
      let users = await adminService.getAllShops(id);
      if (users.EC === 5) {
            return res.status(200).json({
                  EC: 5,
                  EM: "Not authorized",
            });
      }
      return res.status(200).json({
            EC: 0,
            EM: "Ok",
            users: users,
      });
};

const handleCreateNewUser = async (req, res) => {
      console.log("req.body: ", req.body);
      let message = await adminService.createNewUser(req.body);
      console.log(message);
      return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
      if (!req.body.id) {
            return res.status(200).json({
                  EC: 1,
                  EM: "Missing parameter",
            });
      }
      let message = await adminService.deleteUser(req.body.id);
      return res.status(200).json(message);
};

// const handleContactUsByEmail = async (req, res) => {
//       let email = req.body.email;
//       let phoneNumber = req.body.phoneNumber;
//       let title = req.body.title;
//       let firstName = req.body.firstName;
//       let desc = req.body.desc;
//       const message = await userService.contactUsByEmail(email, phoneNumber, firstName, desc, title);
//       return res.status(200).json(message);
// };

// const handleEnabledUser = async (req, res) => {
//       let id = req.body.data.id;
//       let status = req.body.data.status;
//       const message = await userService.enabledUser(id, status);
//       return res.status(200).json(message);
// };

module.exports = {
      handleGetAllUsers: handleGetAllUsers,
      handleGetAllShops: handleGetAllShops,
      handleGetAllShippers: handleGetAllShippers,
      handleGetAllBuyers: handleGetAllBuyers,
      handleCreateNewUser: handleCreateNewUser,
      handleDeleteUser: handleDeleteUser,

      // handleContactUsByEmail: handleContactUsByEmail,
      // handleEnabledUser: handleEnabledUser,
};
