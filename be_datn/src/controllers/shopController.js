/** @format */

import shopService from "../services/shopService";
import { verifyToken } from "../middleware/JWTAction";

const handleCreateNewItemProduct = async (req, res) => {
  const data = req.body;
  let message = await shopService.createNewItemProduct(data);
  return res.status(200).json(message);
};

const handleGetAllProduct = async (req, res) => {
  let id = req.query.id;
  let access_token = req.query.access_token;
  if (!id) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
      products: [],
    });
  }
  let products = await shopService.getAllProduct(id, access_token);
  // console.log(products);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    products: products,
  });
};

const handleGetItemProduct = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
      item: [],
    });
  }
  let item = await shopService.getItemProduct(id);
  // console.log(products);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleDeleteItemProduct = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
    });
  }
  let message = await shopService.deleteItemProduct(id);
  return res.status(200).json(message);
};

const handleUpdateItemProduct = async (req, res) => {
  const data = req.body;
  let message = await shopService.updateItemProduct(data);
  return res.status(200).json(message);
};

//introduce shop

const handleGetIntroduceExtra = async (req, res) => {
  const { id, access_token } = req.query;
  const decode = verifyToken(access_token);
  const idShop = parseInt(decode.idUser);
  let result = await shopService.getIntroduceExtra(id, idShop);
  return res.status(200).json(result);
};

const handleCreateIntroduceExtra = async (req, res) => {
  const data = req.body;
  // const access_token = data.access_token;
  // const decode = verifyToken(access_token);
  // const idShop = parseInt(decode.idUser);
  // data.idShop = idShop;
  let result = await shopService.createIntroduceExtra(data);
  return res.status(200).json(result);
};

const handleDeleteIntroduceExrta = async (req, res) => {
  let data = req.query;
  console.log("data", data);
  let result = await shopService.deleteIntroduceExtra(data);
  return res.status(200).json(result);
};

const handleGetIntroduce = async (req, res) => {
  const access_token = req.query.access_token;
  const decode = verifyToken(access_token);
  const idShop = parseInt(decode.idUser);

  let result = await shopService.getIntroduce(idShop);
  return res.status(200).json(result);
};

const handleCreateIntroductionShop = async (req, res) => {
  const data = req.body;
  let message = await shopService.createIntroductionShop(data);
  return res.status(200).json(message);
};

// handle vourcher

const handleCreateVoucher = async (req, res) => {
  const data = req.body;
  let result = await shopService.createVoucher(data);
  return res.status(200).json(result);
};
const handleGetAllVoucherShop = async (req, res) => {
  let access_token = req.query.access_token;
  const decode = verifyToken(access_token);
  const idShop = parseInt(decode.idUser);
  let result = await shopService.getAllVoucher(idShop);
  return res.status(200).json(result);
};
const handleUpdateVoucher = async (req, res) => {
  const data = req.body;
  let result = await shopService.updateVoucher(data);
  return res.status(200).json(result);
};
const handleDeleteVoucher = async (req, res) => {
  const data = req.body;
  let result = await shopService.deleteVoucher(data);
  return res.status(200).json(result);
};

module.exports = {
  handleCreateNewItemProduct: handleCreateNewItemProduct,
  handleGetAllProduct: handleGetAllProduct,
  handleGetItemProduct: handleGetItemProduct,
  handleDeleteItemProduct: handleDeleteItemProduct,
  handleUpdateItemProduct: handleUpdateItemProduct,
  //introduce shop
  handleGetIntroduceExtra: handleGetIntroduceExtra,
  handleCreateIntroduceExtra: handleCreateIntroduceExtra,
  handleDeleteIntroduceExrta: handleDeleteIntroduceExrta,
  handleGetIntroduce: handleGetIntroduce,
  handleCreateIntroductionShop: handleCreateIntroductionShop,
  //voucher
  handleCreateVoucher: handleCreateVoucher,
  handleGetAllVoucherShop: handleGetAllVoucherShop,
  handleUpdateVoucher: handleUpdateVoucher,
  handleDeleteVoucher: handleDeleteVoucher,
};
