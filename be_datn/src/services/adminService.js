/** @format */

import bcrypt from "bcryptjs";
import db from "../models/index";
import userService from "./userService";

const getAllUsers = (userId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let users = "";
                  if (userId === "All") {
                        console.log("getAllUsers");
                        users = await db.User.findAll({
                              attributes: {
                                    exclude: ["password"],
                              },
                              where: {
                                    roleId: ["BUYER", "SHIPPER", "SHOP"],
                              },
                        });
                  } else {
                        users = await db.User.findOne({
                              attributes: {
                                    exclude: ["password"],
                              },
                              where: { id: userId },
                        });
                  }
                  resolve(users);
            } catch (e) {
                  reject(e);
            }
      });
};

const getAllShops = (userId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let users = "";
                  if (userId === "All") {
                        console.log("getAllShops");
                        users = await db.User.findAll({
                              attributes: {
                                    exclude: ["password"],
                              },
                              where: {
                                    roleId: ["SHOP"],
                              },
                        });
                        console.log(users);
                  } else {
                        users = await db.User.findOne({
                              attributes: {
                                    exclude: ["password"],
                              },
                              where: { id: userId },
                        });
                  }
                  resolve(users);
            } catch (e) {
                  reject(e);
            }
      });
};

const getAllShippers = (userId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let users = "";
                  if (userId === "All") {
                        console.log("getAllShippers");
                        users = await db.User.findAll({
                              attributes: {
                                    exclude: ["password"],
                              },
                              where: {
                                    roleId: ["SHIPPER"],
                              },
                        });
                        console.log(users);
                  } else {
                        users = await db.User.findOne({
                              attributes: {
                                    exclude: ["password"],
                              },
                              where: { id: userId },
                        });
                  }
                  resolve(users);
            } catch (e) {
                  reject(e);
            }
      });
};

const getAllBuyers = (userId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let users = "";
                  if (userId === "All") {
                        console.log("getAllBuyers");
                        users = await db.User.findAll({
                              attributes: {
                                    exclude: ["password"],
                              },
                              where: {
                                    roleId: ["BUYER"],
                              },
                        });
                        console.log(users);
                  } else {
                        users = await db.User.findOne({
                              attributes: {
                                    exclude: ["password"],
                              },
                              where: { id: userId },
                        });
                  }
                  resolve(users);
            } catch (e) {
                  reject(e);
            }
      });
};

const createNewUser = async (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  console.log("data: ", data);
                  let checkEmail = await userService.checkUserEmail(data.email);
                  let checkPhoneNumber = await userService.checkUserPhoneNumber(data.phoneNumber);
                  if (checkEmail || checkPhoneNumber) {
                        resolve({
                              EC: 1,
                              EM: "Email || phone number is already exist!",
                        });
                  } else {
                        let hashPasswordFromBcrypt = await userService.hashUserPassword(data.password);
                        let desc = data.description;
                        if (desc === "") {
                              desc = "null";
                        }
                        await db.User.create({
                              firstName: data.firstName,
                              lastName: data.lastName,
                              roleId: data.roleId,
                              gender: data.gender,
                              email: data.email,
                              password: hashPasswordFromBcrypt,
                              description: "null",
                              address: data.address,
                              phoneNumber: data.phoneNumber,
                              image: data.image,
                              bankAccount: data.bankAccount,
                              momo: data.momo,
                              enable: "true",
                        });
                        resolve({
                              EC: 0,
                              EM: "OK",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const deleteUser = (id) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let user = await db.User.findOne({
                        where: { id: id },
                  });
                  if (!user) {
                        resolve({
                              EC: 2,
                              message: "User not found!",
                        });
                  }
                  await db.User.destroy({
                        where: { id: id },
                  });
                  resolve({
                        EC: 0,
                        message: `User ${id} deleted successfully!`,
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

module.exports = {
      getAllUsers: getAllUsers,
      getAllShops: getAllShops,
      getAllShippers: getAllShippers,
      getAllBuyers: getAllBuyers,
      deleteUser: deleteUser,
      createNewUser: createNewUser,
};
