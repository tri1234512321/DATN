import express from "express";
import paymentController from "../controllers/paymentController";
import authUser from "../middleware/authUser";

let router = express.Router()

//Post
router.post("/payment", paymentController.handlePayment)
router.post("/callback", paymentController.handleCallback)
router.get("/check-status-order", paymentController.handleCheckStatusOrder)

export default router