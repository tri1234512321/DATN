/** @format */

import buyerService from "../services/BuyerService";
import { verifyToken } from "../middleware/JWTAction";

const handleGetAllProduct = async (req, res) => {
      let id = req.query.id;
      console.log(id);
      if (!id) {
            return res.status(200).json({
                  EC: 1,
                  EM: "Missing parameter",
                  products: [],
            });
      }
      let products = await buyerService.getAllProduct(id);
      return res.status(200).json({
            EC: 0,
            EM: "Ok",
            products: products,
      });
};
// lấy cart của buyer đã mua của shop đó hay chưa, nêu chưa, tạo 1 cart mới
const handleGetCartBuyer = async (idBuyer, idShop) => {
      const idCart = await buyerService.getCartBuyer(idBuyer, idShop);
      // console.log("handleGetCartBuyer idCart: ", idCart);
      return idCart ? idCart : "null";
};

const handleCreateNewCart = async (idBuyer, idShop) => {
      // console.log("check handleCreateNewCart");

      let idCart = await buyerService.createNewCart(idBuyer, idShop);
      return idCart;
};

const handleGetAllCart = async (req, res) => {
      let access_token = req.query.access_token;
      const decode = verifyToken(access_token);
      const idBuyer = parseInt(decode.idUser);
      let allCart = await buyerService.getAllCart(idBuyer);
      console.log("idBuyer: ", idBuyer);
      // allCart chứa tất cả cart của buyerId
      return res.status(200).json({
            EC: 0,
            EM: "Ok",
            allCart: allCart,
      });
};

const handleGetAllCartItemById = async (req, res) => {
      let idCart = req.query.idCart;
      console.log("id cart", idCart);
      let allCartItem = await buyerService.getAllCartItem(idCart);
      return res.status(200).json({
            EC: 0,
            EM: "Ok",
            allCartItem: allCartItem,
      });
};

const handleAddFoodToCartItem = async (req, res) => {
      const data = req.body;
      const decode = verifyToken(data.access_token);
      const idBuyer = parseInt(decode.idUser);
      let idShop = parseInt(data.idShop);
      let idFood = parseInt(data.idFood);
      let amountFood = parseInt(data.amountFood);
      let timeAt = data.timeAt;
      let cart;
      // const mes = await handleGetCartBuyer(idBuyer, idShop);
      // console.log(mes);
      const cartBuyer = await handleGetCartBuyer(idBuyer, idShop);
      if (cartBuyer === "null") {
            cart = await handleCreateNewCart(idBuyer, idShop);
      } else {
            cart = await handleGetCartBuyer(idBuyer, idShop);
      }
      let idCart = cart.id;
      if (idCart && idFood && amountFood && timeAt) {
            const message = await buyerService.addFoodToCartItem(idCart, idFood, amountFood, timeAt);
            return res.status(200).json(message);
      } else {
            return res.status(200).json({ EM: "Missing parameter!" });
      }
};

const handleGetFoodById = async (req, res) => {
      let idFood = req.query.idFood;
      console.log("id cart", idFood);
      let food = await buyerService.getFoodById(idFood);
      return res.status(200).json({
            EC: 0,
            EM: "Ok",
            food: food,
      });
};
// const handleChangeAmountFood = async(req, res) => {

// }

module.exports = {
      handleGetAllProduct: handleGetAllProduct,
      handleGetAllCart: handleGetAllCart,
      handleAddFoodToCartItem: handleAddFoodToCartItem,
      handleGetAllCartItemById: handleGetAllCartItemById,
      handleGetFoodById: handleGetFoodById,
};
