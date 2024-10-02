import express from "express";
import adminController from "../controllers/adminController";
//middle
import authAdmin from "../middleware/authAdmin";

let router = express.Router();
// get user
router.get("/admin-get-all-users", authAdmin.authAdmin, adminController.handleGetAllUsers);
router.get("/admin-get-all-shops", authAdmin.authAdmin, adminController.handleGetAllShops);
router.get("/admin-get-all-shippers", authAdmin.authAdmin, adminController.handleGetAllShippers);
router.get("/admin-get-all-buyers", authAdmin.authAdmin, adminController.handleGetAllBuyers);
//
router.post("/create-new-user", authAdmin.authAdmin, adminController.handleCreateNewUser);
router.delete("/delete-user", authAdmin.authAdmin, adminController.handleDeleteUser);
router.post("/change-status-user", authAdmin.authAdmin, adminController.handleChangeStatusUser);

// create job shiper
router.post("/create-job", authAdmin.authAdmin, adminController.handleCreateJob);
router.post("/edit-job", authAdmin.authAdmin, adminController.handleEditJob);
router.post("/delete-job", authAdmin.authAdmin, adminController.handleDeleteJob);
router.get("/all-job", authAdmin.authAdmin, adminController.handleAllJob);

//shift
router.post("/update-shift", authAdmin.authAdmin, adminController.handleUpdateShift);
router.get("/admin-get-shifts", authAdmin.authAdmin, adminController.handleGetShift);

export default router;
