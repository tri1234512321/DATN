/** @format */

import db from "../models/index";
import userService from "./userService";
import JWTAction from "../middleware/JWTAction";

const createNewItemProduct = async (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  console.log("check");
                  let access_token = data.access_token;
                  let decode = JWTAction.verifyToken(access_token);
                  let idShop = Number(decode.idUser);
                  console.log(Number(idShop));
                  console.log(data.descItem);
                  await db.FoodItem.create({
                        idShop: idShop,
                        primaryImage: data.imageItem,
                        price: data.priceItem,
                        foodName: data.foodName,
                        descFood: data.descItem,
                  });
                  resolve({
                        EC: 0,
                        EM: "OK",
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

const getAllProduct = (id, access_token) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let products = "";
                  const decode = JWTAction.verifyToken(access_token);
                  const idUser = Number(decode.idUser);
                  if (id === "All") {
                        // console.log("getAllproduct");
                        products = await db.FoodItem.findAll({
                              where: {
                                    idShop: idUser,
                              },
                        });
                        // console.log(products);
                  }
                  resolve(products);
            } catch (e) {
                  reject(e);
            }
      });
};
const getItemProduct = (id) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let item = "";
                  if (id) {
                        // console.log("getAllproduct");
                        item = await db.FoodItem.findOne({
                              where: {
                                    id: id,
                              },
                        });
                        console.log(item);
                  }
                  resolve(item);
            } catch (e) {
                  reject(e);
            }
      });
};
const deleteItemProduct = async (id) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let item = await db.FoodItem.findOne({
                        where: { id: id },
                  });
                  if (!item) {
                        resolve({
                              EC: 2,
                              message: "Item not found!",
                        });
                  }
                  await db.FoodItem.destroy({
                        where: { id: id },
                  });
                  resolve({
                        EC: 0,
                        message: `Food with ${id} deleted successfully!`,
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

const updateItemProduct = async (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.id) {
                        resolve({
                              EC: 2,
                              EM: "Missing id!",
                        });
                  }
                  let item = await db.FoodItem.findOne({
                        where: { id: data.id },
                        raw: false,
                  });
                  if (item) {
                        item.price = data.priceItem;
                        item.foodName = data.foodName;
                        item.descFood = data.descItem;
                        item.primaryImage = data.imageItem;
                        await item.save();
                        resolve({
                              EC: 0,
                              message: "Item updated!",
                        });
                  } else {
                        resolve({
                              EC: 1,
                              EM: "Item not found!",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const addMoreImageItemProduct = async (imageItem) => {};

module.exports = {
      createNewItemProduct: createNewItemProduct,
      getAllProduct: getAllProduct,
      deleteItemProduct: deleteItemProduct,
      getItemProduct: getItemProduct,
      updateItemProduct: updateItemProduct,
};
