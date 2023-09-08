import express from "express";
import usersController from "../controllers/users/index.controller.js";
import expressCallback from "../helpers/expressCallback.js";

const router = express.Router();

router
  .get("/login", expressCallback(usersController.loginUser))
  .get("/logout", expressCallback(usersController.logoutUser))
  .post("/signup", expressCallback(usersController.postUser));

export default router;
