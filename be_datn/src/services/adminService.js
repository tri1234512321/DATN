/** @format */

import bcrypt from "bcryptjs";
import db from "../models/index";
import { dtb } from "../config/connect";
import userService from "./userService";
import { driver } from "../config/neo4j";

import { all } from "axios";

const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "All") {
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
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          where: {
            roleId: ["SHOP"],
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

const getAllShippers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "All") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          where: {
            roleId: ["SHIPPER"],
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

const getAllBuyers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "All") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          where: {
            roleId: ["BUYER"],
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

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = await userService.checkUserEmail(data.email);
      let checkPhoneNumber = await userService.checkUserPhoneNumber(
        data.phoneNumber
      );
      if (checkEmail || checkPhoneNumber) {
        resolve({
          EC: 1,
          EM: "Email || phone number is already exist!",
        });
      } else {
        console.log("check data: ", data);
        let hashPasswordFromBcrypt = await userService.hashUserPassword(
          data.password
        );
        let desc = data.description;
        if (desc === "") {
          desc = "null";
        }
        let status = "FALSE";
        if (data.roleId === "BUYER") {
          status = "TRUE";
        }
        let result = await db.User.create({
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
          enable: status,
        });

        //Them User
        const session = driver.session();
        let userName4j = result.email;
        await session
              .run('MERGE (u:User {userName: $userName})', { userName: userName4j })
              .then((result) => {
                session.close();
              })
              .catch(error => {
                console.log(error);
              })
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
          EM: "User not found!",
        });
      }
      await db.User.destroy({
        where: { id: id },
      });
      resolve({
        EC: 0,
        EM: `User ${id} deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const changeStatusUser = (idUser, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      let findUser = await db.User.findOne({
        where: { id: idUser },
        raw: false,
      });
      if (findUser) {
        findUser.enable = status;
        await findUser.save();

        resolve({
          EC: 0,
          EM: "Ok",
        });
      } else {
        resolve({
          EC: 2,
          EM: "Not found User",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const createJob = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //in db slot: number
      let job = await db.Job.create({
        idAdmin: data.id,
        typeWork: data.jobType,
        slot: data.slots,
        occupant: 0,
        hourlyWage: data.hourlyWage,
        startTime: data.startTime,
        endTime: data.endTime,
        date:data.date,
        status: "WAITING"
      });
      if (job) {
        resolve({
          EC: 0,
          EM: "Ok",
          data: job,
        });
      } else {
        resolve({
          EC: 1,
          EM: "Create job failed!",
          data: null,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const allJob = (idAdmin) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allJob = await db.Job.findAll({
        where: { idAdmin: idAdmin },
      });
      if (allJob) {
        resolve({
          EC: 0,
          EM: "Get all job by Admin",
          data: allJob,
        });
      } else {
        resolve({
          EC: 1,
          EM: "Not found Job !!!",
          data: null,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editJob = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // typeWork: data.jobType,
      //   slot: data.slots,
      //   hourlyWage: data.hourlyWage,
      console.log("check data edit: ", data);
      let jobs = await db.Job.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (jobs) {
        jobs.typeWork = data.typeWork;
        jobs.slot = data.slot;
        jobs.hourlyWage = data.hourlyWage;

        await jobs.save();
        resolve({
          EC: 0,
          EM: "Edit job successfully!",
        });
      } else {
        resolve({
          EC: 1,
          EM: "Not found Job !!!",
          data: null,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteJob = (idJob) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("check delete: ", idJob);
      let job = await db.Job.findOne({
        where: { id: idJob },
      });
      if (!job) {
        resolve({
          EC: 2,
          EM: "Job not found!",
        });
      }
      await db.Job.destroy({
        where: { id: idJob },
      });
      resolve({
        EC: 0,
        EM: `Job ${idJob} deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//update shift
const updateShift = async (idShift, accepted, idJob, occupant) => {
  try {
    // Validate input parameters
    if (!idShift || accepted===undefined) {
      return {
        EC: 1,
        EM: "Missing params!",
      };
    }

    // Find the parcel item in the database
    const item = await db.Shift.findOne({ where: { id: idShift } ,raw: false,});

    let jobs = await db.Job.findOne({
      where: { id: idJob },
      raw: false,
    });

    // Check if the item was found
    if (!item || !jobs) {
      return {
        EC: 1,
        EM: "Item not found!",
      };
    }

    if(jobs.occupant==0 && occupant<0) {
      return {
        EC: -1,
        EM: "Job do not have any shift!",
      };
    }

    if(jobs.occupant==jobs.slot && occupant>0) {
      return {
        EC: -1,
        EM: "Job is full!",
      };
    }

    // Update the item's status
    item["accepted"] = accepted;
    // console.log(item);
    await item.save();
    // console.log(occupant);
    jobs.occupant = jobs.occupant+occupant;
    await jobs.save();

    return {
      EC: 0,
      EM: "Item updated!",
      occupant: jobs.occupant
    };
  } catch (e) {
    // Log the error and return a failure response
    console.error("Error updating shift:", e);
    return {
      EC: 2,
      EM: "An error occurred while updating the item.",
    };
  }
};

const getShift = async (idJob) => {
  try {
    // console.log(idJob,typeof(idJob),idShipper,typeof(idShipper))
    const q = `SELECT u.*, s.id as idShift, accepted
               FROM shifts AS s 
               JOIN users AS u ON (s.idShipper = u.id) 
               WHERE (s.idJob=?) 
               ORDER BY s.createdAt`;
    const values = [idJob];

    // Assuming dtb.query returns a promise-based API, if not, use a promisify function
    const data = await new Promise((resolve, reject) => {
      dtb.query(q, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });

    if (data) {
      return {
        EC: 0,
        EM: "Get all shifts",
        data: data,
      };
    } else {
      return {
        EC: 1,
        EM: "No shifts found!",
        data: null,
      };
    }
  } catch (e) {
    // Log the error and return a failure response
    console.error("Error on getting Shifts:", e);
    return {
      EC: 2,
      EM: "An error occurred while getting shifts.",
    };
  }
};

module.exports = {
  getAllUsers: getAllUsers,
  getAllShops: getAllShops,
  getAllShippers: getAllShippers,
  getAllBuyers: getAllBuyers,
  deleteUser: deleteUser,
  createNewUser: createNewUser,
  changeStatusUser: changeStatusUser,
  //job
  createJob: createJob,
  allJob: allJob,
  editJob: editJob,
  deleteJob: deleteJob,

  //shift
  updateShift:updateShift,
  getShift:getShift,
};
