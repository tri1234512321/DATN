/** @format */

import userService from "../services/userService";

const handleLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
      return res.status(500).json({
        EC: 1,
        EM: "Missing enter email or password",
      });
    }

    let userData = await userService.handleUserLogin(email, password);
    // console.log("user: ", userData);
    if (!userData.data || !userData.data.access_token) {
      return res.status(403).json({
        EC: userData.EC,
        EM: userData.EM,
        data: null,
      });
    }

    res.cookie("jwt", userData.data.access_token, { httpOnly: true });
    return res.status(200).json({
      EC: userData.EC,
      EM: userData.EM,
      data: userData.data ? userData.data : {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: "-1",
      EM: "Error from server!",
      DT: "",
    });
  }
};

const changePassword = async (req, res) => {
  let data = req.body;
  let message = await userService.changePassword(data);
  return res.status(200).json(message);
};

const forgotPassword = async (req, res) => {
  let email = req.body.email;
  let message = await userService.forgotPassword(email);
  return res.status(200).json(message);
};

const handleCreateNewUser = async (req, res) => {
  console.log(1);
  let message = await userService.createNewUser(req.body);

  return res.status(200).json(message);
};

const handleEditNewUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

const handleGetRate = async (req, res) => {
  let data = req.query;
  let output = await userService.getRate(data);
  return res.status(200).json(output);
};

//Notification
const handleCreateNewNotification = async (req, res) => {
  const data = req.body;
  let message = await userService.createNewNotification(data);
  return res.status(200).json(message);
};

const handleGetNotification = async (req, res) => {
  let idReceivedUser = req.query.idReceivedUser;
  // console.log(id);
  let item = await userService.getNotification(idReceivedUser);
  // console.log(Notifications);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleDeleteNotification = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
    });
  }
  let message = await userService.deleteNotification(id);
  return res.status(200).json(message);
};

const handleUpdateNotification = async (req, res) => {
  const data = req.body;
  let message = await userService.updateNotification(data);
  return res.status(200).json(message);
};

//findUser
const handleGetUser = async (req, res) => {
  let name = req.query.name;
  let access_token = req.query.access_token;
  // console.log(id);
  let item = await userService.getUser(name,access_token);
  // console.log(Notifications);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleGetRelation = async (req, res) => {
  let idUser = req.query.idUser;
  let idRelationUser = req.query.idRelationUser;
  // console.log(id);
  let item = await userService.getRelation(idUser,idRelationUser);
  // console.log(Notifications);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

// parcel
const handleGetParcelByStatus = async (req, res) => {
  let access_token = req.query.access_token;
  let status = req.query.status;
  let result = await userService.getParcelByStatus(access_token,status);
  return res.status(200).json(result);
};

const handleGetParcelByIdOrder = async (req, res) => {
  let access_token = req.query.access_token;
  let idOrder = req.query.idOrder;
  let result = await userService.getParcelByIdOrder(access_token,idOrder);
  return res.status(200).json(result);
};

const handleUpdateParcel = async (req, res) => {
  let access_token = req.body.access_token;
  let idParcel = req.body.idParcel;
  let status = req.body.status;
  let result = await userService.updateParcel(access_token,idParcel,status);
  return res.status(200).json(result);
};

const handleGetParcelItem = async (req, res) => {
  let access_token = req.query.access_token;
  let idParcel = Number(req.query.idParcel);
  let result = await userService.getParcelItem(access_token,idParcel);
  return res.status(200).json(result);
};

//order
const handleGetOrderByStatus = async (req, res) => {
  let access_token = req.query.access_token;
  let status = req.query.status;
  let result = await userService.getOrderByStatus(access_token,status);
  return res.status(200).json(result);
};

const handleUpdateOrder = async (req, res) => {
  let access_token = req.body.access_token;
  let idOrder = req.body.idOrder;
  let status = req.body.status;
  let result = await userService.updateOrder(access_token,idOrder,status);
  return res.status(200).json(result);
};

module.exports = {
  handleLogin: handleLogin,
  handleEditNewUser: handleEditNewUser,
  changePassword: changePassword,
  forgotPassword: forgotPassword,
  handleCreateNewUser,

  handleGetRate: handleGetRate,

  handleCreateNewNotification: handleCreateNewNotification,
  handleGetNotification: handleGetNotification,
  handleDeleteNotification: handleDeleteNotification,
  handleUpdateNotification: handleUpdateNotification,

  handleGetUser:handleGetUser,
  handleGetRelation:handleGetRelation,

    
  handleGetParcelByStatus: handleGetParcelByStatus,
  handleGetParcelByIdOrder,
  handleUpdateParcel: handleUpdateParcel,
  handleGetParcelItem:handleGetParcelItem,

  handleGetOrderByStatus:handleGetOrderByStatus,
  handleUpdateOrder,
};
