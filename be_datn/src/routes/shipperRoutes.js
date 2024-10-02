import express from "express";
import shipperController from "../controllers/shipperController";
//middle
import authShipper from "../middleware/authShipper";

let router = express.Router();
// create shift
router.post("/create-shift", authShipper.authShipper, shipperController.handleCreateShift);
router.get("/get-shifts", authShipper.authShipper, shipperController.handleGetShift);
router.delete("/delete-shift/:id", authShipper.authShipper, shipperController.handleDeleteShift);

router.get("/get-all-job", authShipper.authShipper, shipperController.handleGetAllJob);
router.get("/get-accepted-shift", authShipper.authShipper, shipperController.handleGetAcceptedShift);

export default router;
