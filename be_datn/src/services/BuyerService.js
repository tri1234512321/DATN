/** @format */

import bcrypt from "bcryptjs";
import db from "../models/index";
import userService from "./userService";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getAllProduct = (id) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let products = "";
                  if (id === "All") {
                        console.log("get all products");
                        products = await db.FoodItem.findAll({});
                  }
                  // console.log(products);
                  resolve(products);
            } catch (e) {
                  reject(e);
            }
      });
};

const getCartBuyer = (idBuyer, idShop) => {
      return new Promise(async (resolve, reject) => {
            try {
                  // console.log("idBuyer", idBuyer, "shop", idShop);
                  let idCart = await db.Cart.findOne({
                        where: { idBuyer: idBuyer, idShop: idShop },
                  });
                  // console.log("idCart: ", idCart);
                  if (idCart) {
                        resolve(idCart);
                  } else {
                        resolve("null");
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const createNewCart = (idBuyer, idShop) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idBuyer || !idShop) {
                        resolve("Missing parameters: idBuyer or idShop");
                  }
                  // console.log("create new cart");
                  await db.Cart.create({
                        idBuyer: idBuyer,
                        idShop: idShop,
                  });
                  let idCart = await getCartBuyer(idBuyer, idShop);
                  resolve(idCart);
            } catch (e) {
                  reject(e);
            }
      });
};
const getAllCart = (idBuyer) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idBuyer) {
                        resolve("Missing parameter idBuyer!");
                  }
                  let allCart = await db.Cart.findAll({ where: { idBuyer: idBuyer } });
                  resolve(allCart);
            } catch (e) {
                  reject(e);
            }
      });
};
const addFoodToCartItem = (idCart, idFood, amountFood, timeAt) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idCart || !idFood || !amountFood || !timeAt) {
                        resolve("Missing parameters!");
                  }
                  let foodExist = await db.CartItem.findOne({
                        where: { idFood: idFood, idCart: idCart },
                        raw: false,
                  });
                  if (!foodExist) {
                        console.log("foodExist");
                        await db.CartItem.create({
                              idCart: idCart,
                              idFood: idFood,
                              amountFood: amountFood,
                              timeAt: timeAt,
                        });
                  } else {
                        amountFood = foodExist.amountFood + 1;
                        console.log(foodExist.amountFood);
                        foodExist.amountFood = amountFood;
                        await foodExist.save();
                  }
                  resolve({
                        EC: 0,
                        EM: "Add food to cart sucessfully!",
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

const getAllCartItem = (idCart) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idCart) {
                        resolve("Missing parameter!");
                  }
                  let allCartItems = await db.CartItem.findAll({
                        where: { idCart: idCart },
                  });
                  resolve(allCartItems);
            } catch (e) {
                  reject(e);
            }
      });
};

const getFoodById = (idFood) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idFood) {
                        resolve("Missing parameter!");
                  }
                  let food = await db.FoodItem.findOne({
                        where: { id: idFood },
                  });
                  if (!food) {
                        resolve("Id food does not exist: ", idFood);
                  }
                  resolve(food);
            } catch (e) {
                  reject(e);
            }
      });
};

module.exports = {
      getAllProduct: getAllProduct,
      getCartBuyer: getCartBuyer,
      createNewCart: createNewCart,
      getAllCart: getAllCart,
      addFoodToCartItem: addFoodToCartItem,
      getAllCartItem: getAllCartItem,
      getFoodById: getFoodById,
};
