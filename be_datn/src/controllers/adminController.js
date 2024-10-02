/** @format */

import adminService from "../services/adminService";
import { verifyToken } from "../middleware/JWTAction";

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
  let message = await adminService.createNewUser(req.body);

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

const handleChangeStatusUser = async (req, res) => {
  let id = req.body.idUser;
  let status = req.body.status;
  const message = await adminService.changeStatusUser(id, status);
  return res.status(200).json(message);
};

const handleCreateJob = async (req, res) => {
  let data = req.body;
  let access_token = data.access_token;
  const decode = verifyToken(access_token);
  const idBuyer = parseInt(decode.idUser);
  data.id = idBuyer;
  let result = await adminService.createJob(data);
  return res.status(200).json(result);
};

const handleAllJob = async (req, res) => {
  let access_token = req.query.access_token;
  const decode = verifyToken(access_token);
  const idAdmin = parseInt(decode.idUser);
  let result = await adminService.allJob(idAdmin);
  return res.status(200).json(result);
};

const handleEditJob = async (req, res) => {
  let input = req.body;
  let result = await adminService.editJob(input);
  return res.status(200).json(result);
};

const handleDeleteJob = async (req, res) => {
  let input = req.body;
  const id = input.id;
  let result = await adminService.deleteJob(id);
  return res.status(200).json(result);
};

//shift
const handleUpdateShift = async (req, res) => {
  let input = req.body;
  const idShift = input.idShift;
  const accepted = input.accepted;
  const idJob = input.idJob;
  const occupant = input.occupant;
  let result = await adminService.updateShift(idShift,accepted, idJob, occupant);
  return res.status(200).json(result);
};

const handleGetShift = async (req, res) => {
  let idJob = Number(req.query.idJob);

  if(!idJob) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing params!",
    });
  } 
  // console.log(idShipper);
  let result = await adminService.getShift(idJob);
  return res.status(200).json(result);
};

module.exports = {
  handleGetAllUsers: handleGetAllUsers,
  handleGetAllShops: handleGetAllShops,
  handleGetAllShippers: handleGetAllShippers,
  handleGetAllBuyers: handleGetAllBuyers,
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUser: handleDeleteUser,

  // handleContactUsByEmail: handleContactUsByEmail,
  handleChangeStatusUser: handleChangeStatusUser,

  //job
  handleCreateJob: handleCreateJob,
  handleAllJob: handleAllJob,
  handleEditJob: handleEditJob,
  handleDeleteJob: handleDeleteJob,

  //shift
  handleUpdateShift:handleUpdateShift,
  handleGetShift:handleGetShift
};
