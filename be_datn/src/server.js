/** @format */

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import socialRoutes from "./routes/social";
import paymentRoutes from "./routes/payment"
import { configCors } from "./config/cors";
import connectDB from "./config/connectDB";
import { createJWT, verifyToken } from "./middleware/JWTAction";
require("dotenv").config();
let app = express();
configCors(app);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

configViewEngine(app);
initWebRoutes(app);
app.use("/api/social", socialRoutes);
app.use("/api/payment", paymentRoutes);

connectDB();

let port = process.env.PORT || 8081;
app.use((req, res) => {
  return res.send("404 not found");
});
app.listen(port, () => {
  console.log(`Backend Nodejs is running on the port: http://localhost:${port}`);
});
