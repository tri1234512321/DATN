/** @format */

import buyerService from "../services/BuyerService";
import { verifyToken } from "../middleware/JWTAction";

const handleGetAllProduct = async (req, res) => {
  let id = req.query.id;
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
  let idCart = await buyerService.createNewCart(idBuyer, idShop);
  return idCart;
};

const handleGetAllCart = async (req, res) => {
  let access_token = req.query.access_token;
  const decode = verifyToken(access_token);
  const idBuyer = parseInt(decode.idUser);
  let allCart = await buyerService.getAllCart(idBuyer);
  // allCart chứa tất cả cart của buyerId
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    allCart: allCart,
  });
};

const handleGetAllCartItemById = async (req, res) => {
  let idCart = req.query.idCart;
  let allCartItem = await buyerService.getAllCartItem(idCart);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    allCartItem: allCartItem,
  });
};

const handleGetAllCartItemByCart = async (req, res) => {
  let carts = req.query.carts;
  let cartsArray = JSON.parse(carts);
  let data = await buyerService.getAllCartItemByCart(cartsArray);
  return res.status(200).json({
    EC: 0,
    EM: "OK",
    data: data,
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
    const message = await buyerService.addFoodToCartItem(
      idCart,
      idFood,
      amountFood,
      timeAt
    );
    return res.status(200).json(message);
  } else {
    return res.status(200).json({ EM: "Missing parameter!" });
  }
};

const handleUpdateCartItem = async (req, res) => {
  let { id, amountFood } = req.body.updatedCartItem;
  let output = await buyerService.updateCartItem({ id, amountFood });
  return res.status(200).json(output);
};

const handleGetFoodDetailById = async (req, res) => {
  let idFood = req.query.idFood;
  let food = await buyerService.getFoodDetailById(idFood);
  return res.status(200).json(food);
};

const handleGetFoodById = async (req, res) => {
  let idFood = req.query.idFood;
  let food = await buyerService.getFoodById(idFood);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    food: food,
  });
};
// const handleChangeAmountFood = async(req, res) => {

// }
const handleDeleteCartItem = async (req, res) => {
  let { id, idCart } = req.body;
  let item = await buyerService.deleteCartItem(id, idCart);
  return res.status(200).json({
    EC: 0,
    EM: "Delete item in cart successfully!",
    item: item,
  });
};

const handlePaymentAll = async (req, res) => {
  let { access_token, totalMoney, allFood, timeOrder } = req.body;
  const decode = verifyToken(access_token);
  const idBuyer = parseInt(decode.idUser);
  let data = await buyerService.paymentAll({
    idBuyer,
    totalMoney,
    allFood,
    timeOrder,
  });
  return res.status(200).json({
    EC: 0,
    EM: "Order successfully!",
  });
};

const handleClearCart = async (req, res) => {
  let data = req.body.data;
  let response = await buyerService.clearCart(data);
  return res.status(200).json({
    EC: 0,
    EM: "Clear Cart successfully!",
  });
};

const handleGetMostPopuparFood = async (req, res) => {
  let recommentedFood = await buyerService.getMostPopuparFood();
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    recommentedFood: recommentedFood,
  });
};

const handleGetMostRegularFoodOrderedWith = async (req, res) => {
  let idFood = req.query.idFood;
  let recommentedFood = await buyerService.getMostRegularFoodOrderedWith(
    idFood
  );
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    recommentedFood: recommentedFood,
  });
};

const handleGetPersonalizedFoodOrderedWith = async (req, res) => {
  let userName = req.query.userName;
  let idFood = Number(req.query.idFood);
  let data = { userName: userName, idFood: idFood };
  let recommentedFood = await buyerService.getPersonalizedFoodOrderedWith(data);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    recommentedFood: recommentedFood,
  });
};

const handleCreateRate = async (req, res) => {
  let data = req.body;
  let access_token = data.access_token;
  const decode = verifyToken(access_token);
  const idUser = parseInt(decode.idUser);
  const { access_token: _, ...rest } = data; // Tách access_token ra, phần còn lại lưu vào rest
  const newData = { ...rest, idUser }; // Sao chép rest vào newData và thêm idUser
  let inputService = await buyerService.createRate(newData);
  return res.status(200).json(inputService);
};
const handleUpdateRate = async (req, res) => {
  let data = req.body.data;
  let inputService = await buyerService.updateRate(data);
  return res.status(200).json(inputService);
};
const handleDeleteRate = async (req, res) => {
  let data = req.body.data;
  let inputService = await buyerService.deleteRate(data);
  return res.status(200).json(inputService);
};

// answer

const handleCreateAnsRate = async (req, res) => {
  let data = req.body;
  let access_token = data.access_token;
  const decode = verifyToken(access_token);
  const idUserSend = parseInt(decode.idUser);
  const { access_token: _, ...rest } = data;
  const newAnswer = { ...rest, idUserSend };
  let inputService = await buyerService.createAnsRate(newAnswer);
  return res.status(200).json(inputService);
};

module.exports = {
  handleGetAllProduct: handleGetAllProduct,
  handleGetAllCart: handleGetAllCart,
  handleAddFoodToCartItem: handleAddFoodToCartItem,
  handleUpdateCartItem: handleUpdateCartItem,
  handleGetAllCartItemById: handleGetAllCartItemById,

  handleGetFoodDetailById: handleGetFoodDetailById,
  handleGetFoodById: handleGetFoodById,
  handleDeleteCartItem: handleDeleteCartItem,
  handleGetAllCartItemByCart: handleGetAllCartItemByCart,
  handleClearCart: handleClearCart,

  handlePaymentAll: handlePaymentAll,

  // rate
  handleCreateRate: handleCreateRate,
  handleUpdateRate: handleUpdateRate,
  handleDeleteRate: handleDeleteRate,

  //answer
  handleCreateAnsRate: handleCreateAnsRate,
  handleGetMostPopuparFood: handleGetMostPopuparFood,
  handleGetMostRegularFoodOrderedWith: handleGetMostRegularFoodOrderedWith,
  handleGetPersonalizedFoodOrderedWith: handleGetPersonalizedFoodOrderedWith,
};
