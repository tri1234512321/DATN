import express from "express";
import adminRoutes from "./adminRoutes";
import shopRoutes from "./shopRoutes";
import buyerRoutes from "./buyerRoutes";
import shipperRoutes from "./shipperRoutes";
import userController from "../controllers/userController";

//middle
import authUser from "../middleware/authUser";
import { auth } from "neo4j-driver";

let router = express.Router();

let initWebRoutes = (app) => {
  // User routes
  router.post("/api/login", userController.handleLogin);
  router.put(
    "/api/edit-user",
    authUser.authUser,
    userController.handleEditNewUser
  );
  router.put(
    "/api/change-password",
    authUser.authUser,
    userController.changePassword
  );
  router.post(
    "/api/forgot-password",
    authUser.authUser,
    userController.forgotPassword
  );
  router.post("/api/register", userController.handleCreateNewUser);
  //get rating
  router.get("/api/rating", authUser.authUser, userController.handleGetRate);

  //Notificaiton
  router.post("/api/notifications", userController.handleCreateNewNotification)
  router.get("/api/notifications", userController.handleGetNotification)
  router.delete("/api/notifications/:id", userController.handleDeleteNotification)
  router.put("/api/notifications", userController.handleUpdateNotification)

  router.get("/api/findUsers", userController.handleGetUser)
  router.get("/api/getRelation", userController.handleGetRelation)

  // parcel
  router.get("/api/get-parcels-by-status", authUser.authUser, userController.handleGetParcelByStatus);
  router.get("/api/get-parcels-by-id-order", authUser.authUser, userController.handleGetParcelByIdOrder);
  router.put("/api/update-parcel", authUser.authUser, userController.handleUpdateParcel);

  //get parcel items
  router.get("/api/get-parcel-items", authUser.authUser, userController.handleGetParcelItem);

  // order
  router.get("/api/get-orders-by-status", authUser.authUser, userController.handleGetOrderByStatus);
  router.put("/api/update-order", authUser.authUser, userController.handleUpdateOrder);

  router.use("/api", adminRoutes);
  router.use("/api", shopRoutes);
  router.use("/api", buyerRoutes);
  router.use("/api", shipperRoutes);

  return app.use("/", router);
};

module.exports = initWebRoutes;
