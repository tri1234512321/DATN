/** @format */

import shipperService from "../services/shipperService";
import { verifyToken } from "../middleware/JWTAction";
import JWTAction from "../middleware/JWTAction";

const handleCreateShift = async (req, res) => {
  let data = req.body;

  if(!data || !data?.access_token) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing params!",
    });
  }

  let access_token = data.access_token;
  const decode = verifyToken(access_token);
  const idShipper = parseInt(decode.idUser);
  data.idShipper = idShipper;
  let result = await shipperService.createShift(data);
  return res.status(200).json(result);
};

const handleGetShift = async (req, res) => {
  let idJob = Number(req.query.idJob);
  let access_token = req.query.access_token;

  if(!idJob|| !access_token) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing params!",
    });
  } 
  const decode = verifyToken(access_token);
  const idShipper = parseInt(decode.idUser);
  // console.log(idShipper);
  let result = await shipperService.getShift(idJob,idShipper);
  return res.status(200).json(result);
};

const handleDeleteShift = async (req, res) => {
  let idShift = req.params.id;
  if(!idShift) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing params!",
    });
  }
  let result = await shipperService.deleteShift(idShift);
  return res.status(200).json(result);
};

//get all job
const handleGetAllJob = async (req, res) => {
  let result = await shipperService.getAllJob();
  return res.status(200).json(result);
};

const handleGetAcceptedShift = async (req,res) => {
  let access_token = req.query.access_token;
  const decode = JWTAction.verifyToken(access_token);
  const idShipper = Number(decode.idUser);
  let result = await shipperService.getAcceptedShift(idShipper);
  return res.status(200).json(result);
}

module.exports = {
  //Shift
  handleCreateShift: handleCreateShift,
  handleGetShift: handleGetShift,
  handleDeleteShift: handleDeleteShift,
  handleGetAllJob:handleGetAllJob,
  handleGetAcceptedShift,
};
