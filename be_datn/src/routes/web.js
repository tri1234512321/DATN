/** @format */

import express from "express";
//admin controller
import adminController from "../controllers/adminController";
//user controller
import userController from "../controllers/userController";
//Shop controller
import shopController from "../controllers/shopController";
//buyer controller
import buyerController from "../controllers/buyerController";
//middleware
import authAdmin from "../middleware/authAdmin";
import authShop from "../middleware/authShop";
import authUser from "../middleware/authUser";
import authBuyer from "../middleware/authBuyer";
let router = express.Router();

let initWebRoutes = (app) => {
      //userController
      router.post("/api/login", userController.handleLogin);

      router.get("/api/admin-get-all-users", authAdmin.authAdmin, adminController.handleGetAllUsers);
      router.get("/api/admin-get-all-shops", authAdmin.authAdmin, adminController.handleGetAllShops);
      router.get("/api/admin-get-all-shippers", authAdmin.authAdmin, adminController.handleGetAllShippers);
      router.get("/api/admin-get-all-buyers", authAdmin.authAdmin, adminController.handleGetAllBuyers);
      router.post("/api/create-new-user", authAdmin.authAdmin, adminController.handleCreateNewUser);
      router.delete("/api/delete-user", authAdmin.authAdmin, adminController.handleDeleteUser);

      router.put("/api/edit-user", authUser.authUser, userController.handleEditNewUser);
      router.put("/api/change-password", authUser.authUser, userController.changePassword);
      router.post("/api/forgot-password", authUser.authUser, userController.forgotPassword);
      // router.post("/api/contact-us", userController.handleContactUsByEmail);
      // router.put("/api/change-status-us.imageItem

      //api shop
      router.post("/api/create-new-item-product", authShop.authShop, shopController.handleCreateNewItemProduct);
      router.get("/api/shop-get-all-product", authShop.authShop, shopController.handleGetAllProduct);
      router.get("/api/shop-get-item-product", authShop.authShop, shopController.handleGetItemProduct);
      router.post("/api/update-item-product", authShop.authShop, shopController.handleUpdateItemProduct);
      router.delete("/api/delete-item-product", authShop.authShop, shopController.handleDeleteItemProduct);

      // api buyer

      router.get("/api/buyer-get-all-product", buyerController.handleGetAllProduct);
      router.post("/api/buyer-add-food-item", authUser.authUser, buyerController.handleAddFoodToCartItem);
      router.get("/api/buyer-get-all-cart", authBuyer.authBuyer, buyerController.handleGetAllCart);
      router.get("/api/get-all-cart-items-by-id", authBuyer.authBuyer, buyerController.handleGetAllCartItemById);
      router.get("/api/get-food-by-id", authBuyer.authBuyer, buyerController.handleGetFoodById);

      return app.use("/", router);
};

module.exports = initWebRoutes;
