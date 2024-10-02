import express from "express";
import shopController from "../controllers/shopController";
//middle
import authShop from "../middleware/authShop";

let router = express.Router();
//product
router.post(
  "/create-new-item-product",
  authShop.authShop,
  shopController.handleCreateNewItemProduct
);
router.get(
  "/shop-get-all-product",
  authShop.authShop,
  shopController.handleGetAllProduct
);
router.get(
  "/shop-get-item-product",
  authShop.authShop,
  shopController.handleGetItemProduct
);
router.post(
  "/update-item-product",
  authShop.authShop,
  shopController.handleUpdateItemProduct
);
router.delete(
  "/delete-item-product",
  authShop.authShop,
  shopController.handleDeleteItemProduct
);

// information
router.get(
  "/get-introduce-extra",
  authShop.authShop,
  shopController.handleGetIntroduceExtra
);
router.post(
  "/create-introduce-extra",
  shopController.handleCreateIntroduceExtra
);
router.delete(
  "/delete-introduce-extra",
  shopController.handleDeleteIntroduceExrta
);
router.get(
  "/get-introduce",
  authShop.authShop,
  shopController.handleGetIntroduce
);
router.post(
  "/create-introduce-shop",
  authShop.authShop,
  shopController.handleCreateIntroductionShop
);

// voucher
router.post(
  "/create-voucher",
  authShop.authShop,
  shopController.handleCreateVoucher
);
router.get(
  "/get-all-voucher-shop",
  authShop.authShop,
  shopController.handleGetAllVoucherShop
);
router.delete(
  "/delete-voucher",
  authShop.authShop,
  shopController.handleDeleteVoucher
);
router.put(
  "/update-voucher",
  authShop.authShop,
  shopController.handleUpdateVoucher
);

export default router;
