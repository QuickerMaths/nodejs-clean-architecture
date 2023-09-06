import express from "express";
import usersController from "../controllers/users/index.controller.js";
import expressCallback from "../helpers/expressCallback.js";

const router = express.Router();

router.post("/", expressCallback(usersController.postUser));

export default router;
