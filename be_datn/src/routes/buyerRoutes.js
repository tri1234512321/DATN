import express from "express";
import buyerController from "../controllers/buyerController";
//middle
import authUser from "../middleware/authUser";
import authBuyer from "../middleware/authBuyer";

let router = express.Router();
//product
router.get("/buyer-get-all-product", buyerController.handleGetAllProduct);

// cart & food
router.get("/get-food-detail-by-id", authBuyer.authBuyer, buyerController.handleGetFoodDetailById);
router.get(
  "/get-food-by-id",
  authBuyer.authBuyer,
  buyerController.handleGetFoodById
);
router.post(
  "/buyer-add-food-item",
  authUser.authUser,
  buyerController.handleAddFoodToCartItem
);
router.put(
  "/update-cart-item",
  authUser.authUser,
  buyerController.handleUpdateCartItem
);
router.get(
  "/buyer-get-all-cart",
  authBuyer.authBuyer,
  buyerController.handleGetAllCart
);
router.get(
  "/get-all-cart-items-by-id",
  authBuyer.authBuyer,
  buyerController.handleGetAllCartItemById
);
router.get(
  "/get-all-cart-item-by-carts",
  authBuyer.authBuyer,
  buyerController.handleGetAllCartItemByCart
);
router.delete(
  "/delete-cart-item",
  authBuyer.authBuyer,
  buyerController.handleDeleteCartItem
);
router.post(
  "/clear-cart",
  authBuyer.authBuyer,
  buyerController.handleClearCart
);
//payment
router.post(
  "/buyer-payment-all",
  authBuyer.authBuyer,
  buyerController.handlePaymentAll
);
//rating food
router.post("/rating", authBuyer.authBuyer, buyerController.handleCreateRate);
router.put("/rating", authBuyer.authBuyer, buyerController.handleUpdateRate);
router.delete("/rating", authBuyer.authBuyer, buyerController.handleDeleteRate);
// answer rating food
router.post(
  "/answer-rating",
  authBuyer.authBuyer,
  buyerController.handleCreateAnsRate
);

// recommendation
router.get(
  "/get-most-popular-food",
  // authBuyer.authBuyer,
  buyerController.handleGetMostPopuparFood
);
router.get(
  "/get-most-regular-food-ordered-with",
  // authBuyer.authBuyer,
  buyerController.handleGetMostRegularFoodOrderedWith
);
router.get(
  "/get-personalized-food-ordered-with",
  // authBuyer.authBuyer,
  buyerController.handleGetPersonalizedFoodOrderedWith
)
export default router;
